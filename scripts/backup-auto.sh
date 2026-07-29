#!/bin/bash
set -e

# ============================================
# AUTOMATED PRODUCTION BACKUP SCRIPT
# Usage: backup-auto.sh [db|full|weekly]
# ============================================

MODE="${1:-full}"

# Load secrets
if [ -f /etc/backup.env ]; then
  source /etc/backup.env
else
  echo "[$(date)] ERROR: /etc/backup.env not found"
  exit 1
fi

BACKUP_ROOT="/opt/backups"
LOG_FILE="/var/log/backup.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
KEEP_DAILY=7
KEEP_WEEKLY=4

mkdir -p "$BACKUP_ROOT"/{postgres,storage,cloudinary,gdrive}
mkdir -p /var/log

log() {
  echo "[$(date)] $1" | tee -a "$LOG_FILE"
}

# ============================================
# DATABASE BACKUP
# ============================================
backup_database() {
  log "Starting PostgreSQL backup..."
  docker exec supabase-db pg_dump -U postgres postgres | gzip > "$BACKUP_ROOT/postgres/prod_${TIMESTAMP}.sql.gz"

  if [ $? -eq 0 ]; then
    SIZE=$(du -h "$BACKUP_ROOT/postgres/prod_${TIMESTAMP}.sql.gz" | cut -f1)
    log "Database backup completed: prod_${TIMESTAMP}.sql.gz ($SIZE)"
  else
    log "ERROR: Database backup failed!"
    return 1
  fi
}

# ============================================
# SUPABASE STORAGE BACKUP
# ============================================
backup_storage() {
  log "Starting Supabase storage backup..."
  STORAGE_DIR=$(docker inspect supabase-storage 2>/dev/null | jq -r '.[0].Mounts[0].Source' 2>/dev/null || echo "")

  if [ -n "$STORAGE_DIR" ] && [ "$STORAGE_DIR" != "null" ]; then
    tar -czf "$BACKUP_ROOT/storage/storage_${TIMESTAMP}.tar.gz" "$STORAGE_DIR" 2>/dev/null
    log "Storage backup completed: storage_${TIMESTAMP}.tar.gz"
  else
    log "Storage backup skipped (container not found)"
  fi
}

# ============================================
# CLOUDINARY BACKUP
# ============================================
backup_cloudinary() {
  log "Starting Cloudinary backup..."

  if [ -z "$CLOUDINARY_API_KEY" ]; then
    log "Cloudinary backup skipped (no credentials)"
    return 0
  fi

  mkdir -p "$BACKUP_ROOT/cloudinary/$TIMESTAMP"
  NEXT_CURSOR=""
  PAGE=1

  while true; do
    URL="https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/resources/image/max_results=500"
    [ -n "$NEXT_CURSOR" ] && URL="$URL&next_cursor=$NEXT_CURSOR"

    RESPONSE=$(curl -s -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" "$URL")
    echo "$RESPONSE" | jq '.resources[] | {public_id, secure_url, bytes}' \
      > "$BACKUP_ROOT/cloudinary/$TIMESTAMP/assets_page_${PAGE}.json"

    NEXT_CURSOR=$(echo "$RESPONSE" | jq -r '.next_cursor // empty')
    [ -z "$NEXT_CURSOR" ] && break
    PAGE=$((PAGE + 1))
  done

  log "Cloudinary backup completed: $PAGE pages"
}

# ============================================
# GOOGLE DRIVE BACKUP
# ============================================
backup_gdrive() {
  log "Starting Google Drive backup..."

  if [ -z "$GOOGLE_DRIVE_FOLDER_ID" ]; then
    log "Google Drive backup skipped (no folder ID)"
    return 0
  fi

  which gdown >/dev/null 2>&1 || pip install gdown -q
  gdown --folder "https://drive.google.com/drive/folders/$GOOGLE_DRIVE_FOLDER_ID" \
    -O "$BACKUP_ROOT/gdrive/${TIMESTAMP}/" 2>/dev/null

  log "Google Drive backup completed"
}

# ============================================
# CLEANUP OLD BACKUPS
# ============================================
cleanup() {
  log "Cleaning up old backups..."
  find "$BACKUP_ROOT/postgres" -name "*.sql.gz" -mtime +$KEEP_DAILY -delete
  find "$BACKUP_ROOT/storage" -name "*.tar.gz" -mtime +$KEEP_DAILY -delete
  find "$BACKUP_ROOT/cloudinary" -type d -mtime +$KEEP_WEEKLY -exec rm -rf {} + 2>/dev/null
  find "$BACKUP_ROOT/gdrive" -type d -mtime +$KEEP_WEEKLY -exec rm -rf {} + 2>/dev/null
  log "Cleanup completed"
}

# ============================================
# MAIN
# ============================================
log "=========================================="
log "  BACKUP MODE: $MODE"
log "=========================================="

case "$MODE" in
  db)
    backup_database
    ;;
  full)
    backup_database
    backup_storage
    cleanup
    ;;
  weekly)
    backup_database
    backup_storage
    backup_cloudinary
    backup_gdrive
    cleanup
    ;;
  *)
    echo "Usage: $0 [db|full|weekly]"
    exit 1
    ;;
esac

log "=========================================="
log "  BACKUP COMPLETED"
log "=========================================="
