# Webmaster Agent Playbook — Affiliate Intelligence Portal

This playbook documents the webmaster cron job process for keeping the affiliate intelligence portal (flywheel-digest) in sync with source data.

## Source Data Location

All source data lives in the flywheel intelligence repo at `~/Projects/flywheel/` on the Mac Ant agent machine:

- **AFARE Scorecards:** `~/Projects/flywheel/affiliate/scores/*.md`
- **Research Files:** `~/Projects/flywheel/research/{networks,verticals,industry}/*.md`
- **Briefings:** Generated from scoring and collection pipeline outputs

## Syncing Vendor YAML Files

Vendor YAML files in `src/content/vendors/` are structured extracts of the AFARE scorecards.

### Process

1. Read each scorecard markdown file from `~/Projects/flywheel/affiliate/scores/`
2. Extract: score summary table, detailed scoring criteria, strengths, gaps, assessment, competitive position
3. Transform into YAML matching the Zod schema in `src/content/config.ts`
4. Write to `src/content/vendors/{vendor-slug}.yaml`

### Key Fields to Extract

- `afareScore` and `afareBand` from the Score Summary section
- `afareDimensions` array with 5 dimensions, each containing 5 criteria with scores and evidence
- `strengths` and `gaps` arrays from the Top 3 sections
- `assessment` and `assessmentHighlight` from the Overall Assessment section
- `competitivePosition` from the Competitive Position table

### Validation

After writing YAML, run `npm run build` to validate against Zod schemas. If validation fails, check:
- All 5 dimensions present with exactly 5 criteria each
- Scores are within bounds (dimension 0-20, criteria 0-4, total 0-100)
- Band matches score range (Early <45, Developing 45-59, Established 60-74, Leading 75+)
- URLs are valid
- Evaluation date is present

## Syncing Research Files

Research markdown files go in `src/content/research/` with adjusted frontmatter.

### Process

1. Read research files from `~/Projects/flywheel/research/{networks,verticals,industry}/*.md`
2. Verify frontmatter has required fields: `title`, `category`, `lastUpdated`
3. Add `summary` field if missing (one-line description of the research)
4. Map category to schema enum: `affiliate-networks`, `verticals`, `industry`, `livechannel`
5. Copy file to `src/content/research/{filename}.md`

### Category Mapping

| Source Directory | Schema Category |
|---|---|
| `research/networks/` | `affiliate-networks` |
| `research/verticals/` | `verticals` |
| `research/industry/` | `industry` |
| `research/livechannel/` | `livechannel` |

## Freshness Audit

Check that portal content is not stale relative to source data.

### Compare Dates

For each vendor YAML in the portal:
1. Read `evaluationDate` from the portal YAML
2. Read `Date:` from the source scorecard markdown
3. If source is newer, re-sync the vendor

For each research file in the portal:
1. Read `lastUpdated` from the portal frontmatter
2. Read `lastUpdated` from the source file frontmatter
3. If source is newer, re-sync the file

### Staleness Thresholds

- Vendor scorecards: Flag if source is >7 days newer than portal
- Research files: Flag if source is >3 days newer than portal
- Briefings: Should be generated daily; flag if latest briefing is >2 days old

## Build and Deploy

```bash
cd ~/Projects/flywheel-digest/
npm run build        # Build static site to dist/
# Deploy happens automatically via GitHub Actions on push to main
git add -A
git commit -m "Sync: update content from flywheel source"
git push origin main
```

### Pre-Deploy Checks

1. `npm run build` completes without errors (validates all Zod schemas)
2. Vendor count matches source scorecard count
3. Research file count matches source directory count
4. No empty content collections (at minimum: 1 vendor, 1 research, 1 briefing)
5. Build output in `dist/` contains expected page count

## Cron Schedule

The webmaster sync job runs daily at 6:00 AM, after the scoring pipeline (5:00 AM) has completed.

| Time | Job |
|---|---|
| 5:00 AM | AFARE scoring pipeline (updates scorecards) |
| 6:00 AM | Webmaster sync (syncs portal content, builds, pushes) |
| 6:15 AM | Freshness audit (flags any stale content) |
