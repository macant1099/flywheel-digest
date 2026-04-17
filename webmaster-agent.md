# Webmaster Agent Playbook — Affiliate Intelligence Portal

This playbook is read by the webmaster-agent cron job at 8:00 AM PST daily.
The briefing-agent (6:00 AM) has already written and published today's briefing.
Your job is to sync everything else and verify site health.

## Step 1: Pull Source Repos

```bash
cd ~/Projects/flywheel && git pull --quiet
cd ~/Projects/flywheel-digest && git pull --quiet
```

## Step 2: Sync Research Files

Copy research markdown from the data repo into the portal content directory:

```bash
cp ~/Projects/flywheel/research/networks/*.md ~/Projects/flywheel-digest/src/content/research/
cp ~/Projects/flywheel/research/verticals/*.md ~/Projects/flywheel-digest/src/content/research/
cp ~/Projects/flywheel/research/industry/*.md ~/Projects/flywheel-digest/src/content/research/
cp ~/Projects/flywheel/research/livechannel/*.md ~/Projects/flywheel-digest/src/content/research/ 2>/dev/null || true
cp ~/Projects/flywheel/research/network-building/*.md ~/Projects/flywheel-digest/src/content/research/
```

Verify each file has YAML frontmatter with title, category, and lastUpdated.

## Step 3: Sync Player Profiles

```bash
cp ~/Projects/flywheel/players/*.md ~/Projects/flywheel-digest/src/content/players/
```

Verify each has frontmatter with name, type, description, vendorRelevance, lastUpdated.

## Step 4: Sync Playbooks

For each file in ~/Projects/flywheel/affiliate/playbooks/ matching *-action-playbook.md:
1. Extract the vendor slug (e.g. anker-action-playbook.md -> anker)
2. Create ~/Projects/flywheel-digest/src/content/playbooks/{vendor}.md
3. The file needs YAML frontmatter that the source doesn't have. Prepend:
   ```
   ---
   vendor: "{vendor}"
   date: "YYYY-MM-DD"
   ---
   ```
4. Then append the full source file contents

Use exec with shell commands:
```bash
printf '---\nvendor: "anker"\ndate: "2026-04-17"\n---\n\n' > /tmp/pb.md
cat ~/Projects/flywheel/affiliate/playbooks/anker-action-playbook.md >> /tmp/pb.md
cp /tmp/pb.md ~/Projects/flywheel-digest/src/content/playbooks/anker.md
```

Do this for every vendor playbook found.

## Step 5: Sync Partner Recommendations

Same approach as playbooks. For each *-partner-recommendations.md file:
```bash
printf '---\nvendor: "anker"\ndate: "2026-04-17"\n---\n\n' > /tmp/pr.md
cat ~/Projects/flywheel/affiliate/partners/anker-partner-recommendations.md >> /tmp/pr.md
cp /tmp/pr.md ~/Projects/flywheel-digest/src/content/partners/anker.md
```

## Step 6: Sync Newsletters

Copy newsletters and ensure they have frontmatter:
```bash
cp ~/Projects/flywheel/newsletters/*.md ~/Projects/flywheel-digest/src/content/newsletters/
```

Check each file. If it does not start with `---`, prepend frontmatter:
```yaml
---
title: "Affiliate Intelligence Weekly"
date: "YYYY-MM-DD"
week: NN
---
```

Extract the week number from the filename (e.g. 2026-W16.md -> week 16).

## Step 7: Freshness Checks

Verify:
- Today's briefing exists in src/content/briefings/ (it should — the briefing-agent wrote it at 6 AM)
- Research files have lastUpdated dates within the past 7 days
- Player profiles have lastUpdated within the past 14 days
- Vendor YAML scores match the latest scorecards in ~/Projects/flywheel/affiliate/scores/

If a vendor YAML is stale (score differs from scorecard), regenerate it from the scorecard data.

## Step 8: Build Verification

```bash
cd ~/Projects/flywheel-digest && npm run build
```

If the build fails, read the error. The most common issue is invalid frontmatter on a synced file. Fix the file and rebuild. After 3 failed attempts, remove the problematic file and build without it.

## Step 9: Commit and Push

```bash
cd ~/Projects/flywheel-digest && git add -A && git diff --cached --quiet || (git commit -m "webmaster: YYYY-MM-DD freshness sync" && git push origin main)
```

If git push fails, run `git pull --rebase` then push again.

## Step 10: Log

Append results to ~/Projects/flywheel-digest/freshness-log.md:
- Date and time
- Files synced (count by type)
- Freshness issues found and fixed
- Build status

If nothing changed across all checks, reply NO_REPLY.
