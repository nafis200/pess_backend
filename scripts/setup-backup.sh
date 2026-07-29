#!/bin/bash
set -e

# ============================================
# VM DEPLOYMENT - AUTOMATED BACKUP SETUP
# Run on fresh Ubuntu/Debian VM
# ============================================

echo "=========================================="
echo "  PESS AUTOMATED BACKUP - VM SETUP"
echo "=========================================="

# Check root
if [ "$EUID" -ne 0 ]; then
  echo "ERROR: Run as root (sudo ./setup-backup.sh)"
  exit 1
fi

# 1. Check dependencies
echo "[1/5] Checking dependencies..."

# Check if Docker is installed
if command -v docker &> /dev/null; then
  echo "  -> Docker already installed (skipped)"
else
  echo "  -> Installing Docker..."
  apt-get update -qq
  apt-get install -y -qq docker.io > /dev/null 2>&1
  systemctl enable docker
  systemctl start docker
  echo "  -> Docker installed"
fi

# Check if jq is installed
if command -v jq &> /dev/null; then
  echo "  -> jq already installed (skipped)"
else
  apt-get update -qq
  apt-get install -y -qq jq > /dev/null 2>&1
  echo "  -> jq installed"
fi

# Check if curl is installed
if command -v curl &> /dev/null; then
  echo "  -> curl already installed (skipped)"
else
  apt-get install -y -qq curl > /dev/null 2>&1
  echo "  -> curl installed"
fi

# Check if gzip is installed
if command -v gzip &> /dev/null; then
  echo "  -> gzip already installed (skipped)"
else
  apt-get install -y -qq gzip > /dev/null 2>&1
  echo "  -> gzip installed"
fi

# Check if gdown is installed
if command -v gdown &> /dev/null; then
  echo "  -> gdown already installed (skipped)"
else
  pip3 install gdown -q 2>/dev/null || pip install gdown -q 2>/dev/null
  echo "  -> gdown installed"
fi

# Verify Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "ERROR: Docker is not running"
  exit 1
fi

# 2. Create directories
echo "[2/5] Creating directories..."
mkdir -p /opt/scripts
mkdir -p /opt/backups/{postgres,storage,cloudinary,gdrive}
mkdir -p /var/log
echo "  -> Directories created"

# 3. Install backup script
echo "[3/5] Installing backup script..."
cat > /opt/scripts/backup-auto.sh << 'SCRIPT'
#!/bin/bash
set -e

MODE="${1:-full}"

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

backup_gdrive() {
  log "Starting Google Drive backup..."

  if [ -z "$GOOGLE_DRIVE_FOLDER_ID" ]; then
    log "Google Drive backup skipped (no folder ID)"
    return 0
  fi

  which gdown >/dev/null 2>&1 || pip3 install gdown -q 2>/dev/null || pip install gdown -q
  gdown --folder "https://drive.google.com/drive/folders/$GOOGLE_DRIVE_FOLDER_ID" \
    -O "$BACKUP_ROOT/gdrive/${TIMESTAMP}/" 2>/dev/null

  log "Google Drive backup completed"
}

cleanup() {
  log "Cleaning up old backups..."
  find "$BACKUP_ROOT/postgres" -name "*.sql.gz" -mtime +$KEEP_DAILY -delete
  find "$BACKUP_ROOT/storage" -name "*.tar.gz" -mtime +$KEEP_DAILY -delete
  find "$BACKUP_ROOT/cloudinary" -type d -mtime +$KEEP_WEEKLY -exec rm -rf {} + 2>/dev/null
  find "$BACKUP_ROOT/gdrive" -type d -mtime +$KEEP_WEEKLY -exec rm -rf {} + 2>/dev/null
  log "Cleanup completed"
}

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
SCRIPT

chmod +x /opt/scripts/backup-auto.sh
echo "  -> /opt/scripts/backup-auto.sh installed"

# 4. Create environment file
echo "[4/5] Creating /etc/backup.env..."
if [ ! -f /etc/backup.env ]; then
  cat > /etc/backup.env << 'EOF'
# /etc/backup.env — Fill in your actual values
# NEVER commit this file to git

# Supabase
SUPABASE_URL="http://203.96.189.205:8000"
SUPABASE_KEY=""

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Google Drive
GOOGLE_DRIVE_FOLDER_ID=""

# Optional: Discord/Slack notification
DISCORD_WEBHOOK=""
EOF
  chmod 600 /etc/backup.env
  chown root:root /etc/backup.env
  echo "  -> Created /etc/backup.env"
else
  echo "  -> /etc/backup.env already exists (skipped)"
fi

# 5. Setup cron jobs
echo "[5/5] Setting up cron jobs..."
crontab -l 2>/dev/null | grep -v "backup-auto.sh" | crontab - 2>/dev/null || true

(crontab -l 2>/dev/null
echo "# === PESS AUTOMATED BACKUPS ==="
echo "# Database backup every 6 hours"
echo "0 */6 * * * /opt/scripts/backup-auto.sh db >> /var/log/backup.log 2>&1"
echo "# Full backup daily at 4:00 AM"
echo "0 4 * * * /opt/scripts/backup-auto.sh full >> /var/log/backup.log 2>&1"
echo "# Weekly backup on Sunday at 5:00 AM"
echo "0 5 * * 0 /opt/scripts/backup-auto.sh weekly >> /var/log/backup.log 2>&1"
) | crontab -

echo ""
echo "=========================================="
echo "  VM SETUP COMPLETED"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Edit /etc/backup.env with your credentials:"
echo "     sudo nano /etc/backup.env"
echo ""
echo "  2. Test backup:"
echo "     sudo /opt/scripts/backup-auto.sh db"
echo ""
echo "  3. Check logs:"
echo "     tail -f /var/log/backup.log"
echo ""
echo "Cron schedule:"
echo "  Database:  Every 6 hours"
echo "  Full:      Daily at 4:00 AM"
echo "  Weekly:    Sunday at 5:00 AM"
