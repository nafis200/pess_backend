# Backup System — Deployment Instructions

## Prerequisites

- SSH access to VM (root or sudo user)
- Docker running with Supabase containers on VM

---

## Step 1: Copy Scripts to VM

```bash
scp pess_backend/scripts/setup-backup.sh root@<VM_IP>:/tmp/
```

Replace `<VM_IP>` with your VM's IP address (e.g., `203.96.189.205`).

---

## Step 2: SSH into VM

```bash
ssh root@<VM_IP>
```

---

## Step 3: Run Setup

```bash
sudo /tmp/setup-backup.sh
```

This will:
- Check and install missing dependencies (jq, curl, gzip, gdown)
- Skip Docker if already installed
- Install backup script to `/opt/scripts/backup-auto.sh`
- Create `/etc/backup.env` with placeholder values
- Setup cron jobs for automated backups

---

## Step 4: Configure Credentials

```bash
sudo nano /etc/backup.env
```

Fill in your actual values:

```bash
# Supabase
SUPABASE_URL="http://<VM_IP>:8000"
SUPABASE_KEY="your-supabase-service-role-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Google Drive
GOOGLE_DRIVE_FOLDER_ID="your-folder-id"

# Optional: Discord/Slack notification
DISCORD_WEBHOOK=""
```

Save and exit (`Ctrl+X`, `Y`, `Enter`).

---

## Step 5: Test Backup

```bash
sudo /opt/scripts/backup-auto.sh db
```

Expected output:
```
[...] BACKUP MODE: db
[...] Starting PostgreSQL backup...
[...] Database backup completed: prod_XXXXXXXX_XXXXXX.sql.gz (XXM)
[...] BACKUP COMPLETED
```

---

## Step 6: Verify Backup File

```bash
ls -lh /opt/backups/postgres/
```

You should see a `.sql.gz` file with today's date.

---

## Step 7: Check Cron Jobs

```bash
crontab -l
```

Expected output:
```
# === PESS AUTOMATED BACKUPS ===
# Database backup every 6 hours
0 */6 * * * /opt/scripts/backup-auto.sh db >> /var/log/backup.log 2>&1
# Full backup daily at 4:00 AM
0 4 * * * /opt/scripts/backup-auto.sh full >> /var/log/backup.log 2>&1
# Weekly backup on Sunday at 5:00 AM
0 5 * * 0 /opt/scripts/backup-auto.sh weekly >> /var/log/backup.log 2>&1
```

---

## Step 8: Monitor Logs

```bash
tail -f /var/log/backup.log
```

Press `Ctrl+C` to stop watching.

---

## Manual Commands Reference

| Command | Description |
|---------|-------------|
| `sudo /opt/scripts/backup-auto.sh db` | Database backup only |
| `sudo /opt/scripts/backup-auto.sh full` | Database + Storage |
| `sudo /opt/scripts/backup-auto.sh weekly` | Everything (DB + Storage + Cloudinary + GDrive) |
| `tail -f /var/log/backup.log` | Watch live logs |
| `crontab -l` | View scheduled backups |
| `ls -lh /opt/backups/postgres/` | List database backups |

---

## Backup Schedule

| Task | Cron | Time |
|------|------|------|
| Database | `0 */6 * * *` | Every 6 hours |
| Full | `0 4 * * *` | Daily 4:00 AM |
| Weekly | `0 5 * * 0` | Sunday 5:00 AM |

---

## Troubleshooting

### Backup fails — "docker: command not found"
```bash
which docker
# If not found, install: apt-get install -y docker.io
```

### Backup fails — "supabase-db container not found"
```bash
docker ps | grep postgres
# Check the container name, update /opt/scripts/backup-auto.sh if needed
```

### Backup fails — "permission denied"
```bash
sudo /opt/scripts/backup-auto.sh db
```

### Cron not running
```bash
# Check cron service
systemctl status cron

# Restart if needed
systemctl restart cron
```

### View backup disk usage
```bash
du -sh /opt/backups/*
```

---

## File Locations

| File | Path |
|------|------|
| Backup script | `/opt/scripts/backup-auto.sh` |
| Environment config | `/etc/backup.env` |
| Backup data | `/opt/backups/` |
| Logs | `/var/log/backup.log` |
