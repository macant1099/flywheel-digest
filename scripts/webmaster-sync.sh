#!/bin/bash
# webmaster-sync.sh — Deterministic sync from flywheel data repo to flywheel-digest portal
# This script does NOT rely on an LLM. It copies files, fixes frontmatter, builds, and deploys.

set -euo pipefail
export PATH="/opt/homebrew/bin:$PATH"

DATA_REPO="$HOME/Projects/flywheel"
PORTAL_REPO="$HOME/Projects/flywheel-digest"
TODAY=$(date +%Y-%m-%d)
LOG="$PORTAL_REPO/sync.log"

echo "[$TODAY $(date +%H:%M:%S)] Webmaster sync starting" >> "$LOG"

# Step 1: Pull both repos
cd "$DATA_REPO" && git pull --quiet 2>/dev/null || true
cd "$PORTAL_REPO" && git pull --quiet 2>/dev/null || true

# Step 2: Sync briefings (add frontmatter if missing)
for f in "$DATA_REPO"/briefings/*.md; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  dest="$PORTAL_REPO/src/content/briefings/$base"
  # Check if file has frontmatter
  if head -1 "$f" | grep -q "^---"; then
    cp "$f" "$dest"
  else
    # Extract date from filename (e.g. 2026-04-16.md)
    fdate=$(basename "$f" .md)
    # Extract first heading as title
    ftitle=$(grep -m1 "^#" "$f" | sed 's/^#* *//' || echo "Flywheel Affiliate Daily — $fdate")
    {
      echo "---"
      echo "title: \"$ftitle\""
      echo "date: \"$fdate\""
      echo "summary: \"Daily affiliate intelligence briefing\""
      echo "---"
      echo ""
      cat "$f"
    } > "$dest"
  fi
done

# Step 3: Sync newsletters (add frontmatter if missing)
for f in "$DATA_REPO"/newsletters/*.md; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  dest="$PORTAL_REPO/src/content/newsletters/$base"
  if head -1 "$f" | grep -q "^---"; then
    cp "$f" "$dest"
  else
    fbase=$(basename "$f" .md)
    week=$(echo "$fbase" | grep -oE '[0-9]+$' || echo "0")
    {
      echo "---"
      echo "title: \"Affiliate Intelligence Weekly — $fbase\""
      echo "date: \"$TODAY\""
      echo "week: $week"
      echo "---"
      echo ""
      cat "$f"
    } > "$dest"
  fi
done

# Step 4: Sync research files
for dir in networks verticals industry livechannel network-building; do
  srcdir="$DATA_REPO/research/$dir"
  [ -d "$srcdir" ] || continue
  for f in "$srcdir"/*.md; do
    [ -f "$f" ] || continue
    cp "$f" "$PORTAL_REPO/src/content/research/"
  done
done

# Step 5: Sync player profiles
if [ -d "$DATA_REPO/players" ]; then
  for f in "$DATA_REPO"/players/*.md; do
    [ -f "$f" ] || continue
    cp "$f" "$PORTAL_REPO/src/content/players/"
  done
fi

# Step 6: Sync playbooks (prepend frontmatter)
mkdir -p "$PORTAL_REPO/src/content/playbooks"
for f in "$DATA_REPO"/affiliate/playbooks/*-action-playbook.md; do
  [ -f "$f" ] || continue
  vendor=$(basename "$f" | sed 's/-action-playbook\.md$//')
  dest="$PORTAL_REPO/src/content/playbooks/$vendor.md"
  {
    echo "---"
    echo "vendor: \"$vendor\""
    echo "date: \"$TODAY\""
    echo "---"
    echo ""
    cat "$f"
  } > "$dest"
done

# Step 7: Sync partner recommendations (prepend frontmatter)
mkdir -p "$PORTAL_REPO/src/content/partners"
for f in "$DATA_REPO"/affiliate/partners/*-partner-recommendations.md; do
  [ -f "$f" ] || continue
  vendor=$(basename "$f" | sed 's/-partner-recommendations\.md$//')
  dest="$PORTAL_REPO/src/content/partners/$vendor.md"
  {
    echo "---"
    echo "vendor: \"$vendor\""
    echo "date: \"$TODAY\""
    echo "---"
    echo ""
    cat "$f"
  } > "$dest"
done

# Step 8: Build
cd "$PORTAL_REPO"
if npm run build >> "$LOG" 2>&1; then
  echo "[$TODAY $(date +%H:%M:%S)] Build succeeded" >> "$LOG"
else
  echo "[$TODAY $(date +%H:%M:%S)] Build FAILED — deploying anyway with previous content" >> "$LOG"
fi

# Step 9: Deploy
cd "$PORTAL_REPO"
git add -A
if ! git diff --cached --quiet; then
  git commit -m "sync: $TODAY webmaster update" >> "$LOG" 2>&1
  git push >> "$LOG" 2>&1 || (git pull --rebase && git push >> "$LOG" 2>&1) || true
  echo "[$TODAY $(date +%H:%M:%S)] Pushed to GitHub" >> "$LOG"
else
  echo "[$TODAY $(date +%H:%M:%S)] No changes to deploy" >> "$LOG"
fi

echo "[$TODAY $(date +%H:%M:%S)] Webmaster sync complete" >> "$LOG"
