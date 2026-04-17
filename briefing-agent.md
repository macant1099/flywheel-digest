# Briefing Agent Playbook — Affiliate Intelligence Portal

This playbook is read by the affiliate-briefing cron job at 6:00 AM PST daily.

## What You Do

Generate the Flywheel Affiliate Daily briefing and publish it directly to the portal.

## Important Rules

- This briefing is a SHARED publication sent to ALL vendors. Do NOT include any vendor-specific data, scores, recommendations, or findings. No vendor names from our tracked list.
- Write directly to the portal content directory — NOT to the flywheel data repo.
- Professional, authoritative tone. Like The Information or Morning Brew.
- Lead with insight, not data. Explain what things MEAN, not just what happened.
- Every section should answer "so what should I do about this?"
- Keep it concise. Readable in 3-4 minutes.

## Step 1: Research Today's News

Run web searches for current affiliate industry news:
- "affiliate marketing news today"
- "affiliate network news this week"
- "affiliate commission trends 2026"
- "AI shopping agent commerce news"
- "affiliate regulation FTC update"
- "influencer affiliate partnership news"
- "ecommerce affiliate program launch"

Also read signal blocks from the past 24 hours in ~/Projects/flywheel/research/ for context.

## Step 2: Write the Briefing

Create the file at: `~/Projects/flywheel-digest/src/content/briefings/YYYY-MM-DD.md`

Use today's date for the filename and frontmatter.

### Frontmatter (required)

```yaml
---
title: "Flywheel Affiliate Daily — YYYY-MM-DD"
date: "YYYY-MM-DD"
summary: "[one-line summary of the lead story]"
---
```

### Sections (all required)

**# Flywheel Affiliate Daily**

**## The Lead** — One story, 3-4 paragraphs. The most important affiliate industry development today. Write as editorial — not just what happened, but what it means for vendors.

**## What's Moving** — 3-5 bullet items. Short, punchy. Each: what happened + one-line "why it matters."

**## Partner Landscape** — Profile one affiliate partner type or notable player. Rotate topics daily: content creators, review sites, comparison engines, loyalty programs, deal sites, influencers, AI agents, membership organizations.

**## The AI Angle** — 2-3 sentences on AI-agent-as-affiliate developments.

**## One Thing to Do Today** — Single actionable item any vendor can act on in 10 minutes.

**Footer:** `_Flywheel Affiliate Daily is published by LiveChannel._`

## Step 3: Also Save to Data Repo

Copy the briefing to the data repo for archive:
```bash
cp ~/Projects/flywheel-digest/src/content/briefings/YYYY-MM-DD.md ~/Projects/flywheel/briefings/
cd ~/Projects/flywheel && git add -A && git diff --cached --quiet || (git commit -m "briefing: YYYY-MM-DD" && git push)
```

## Step 4: Publish

Commit and push from the PORTAL repo to trigger GitHub Actions deploy:
```bash
cd ~/Projects/flywheel-digest && git add -A && git diff --cached --quiet || (git commit -m "briefing: YYYY-MM-DD" && git push origin main)
```

## Step 5: Notify Discord

Use the message tool to post to channel:discord:1492896116830769185:

```
Flywheel Affiliate Daily — YYYY-MM-DD

[The Lead headline]

[2-3 sentence summary]
```

Reply with a summary of what you wrote.
