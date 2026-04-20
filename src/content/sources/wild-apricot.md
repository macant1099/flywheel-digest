---
name: "Wild Apricot"
bucket: "ams"
description: "Self-serve membership software for small clubs and nonprofits; 'discount' features are limited to internal dues/event coupons — no third-party member-perks module."
website: "https://www.wildapricot.com"
owner: "Momentive Software (via Personify; Personify acquired Wild Apricot in 2017, Momentive acquired Personify in 2026)"
targetSourceType: ["club", "professional-association"]
sourceReach: "Historically marketed as #1 membership software for small associations, clubs, and nonprofits; Personify reported 30,000+ organizations across its portfolio post-acquisition"
pricingModel: "Flat-rate SaaS tiered by contact count; public pricing from ~$25/mo (50 contacts) to enterprise tiers for up to 50,000 contacts; no per-transaction fees"
vendorOnboarding: "unknown"
exclusivityPosture: "unknown"
authModel: "Members log in to the association's Wild Apricot-hosted site"
dataVisibility: "None for third-party deals — the discount feature only applies to internal dues, event, and store pricing"
uxSurface: ["Member-only website pages", "Event registration forms", "Membership application/renewal forms"]
integrationDepth: "No affinity/perks module; discount feature is a coupon-code system scoped to Wild Apricot's own billing (dues, events, store)"
strengths:
  - "Low price point puts member identity + a gated website in the hands of very small organizations"
  - "Member-only pages can host partner links and logos easily"
  - "Built-in coupon-code engine exists (but only for internal transactions)"
gaps:
  - "No native third-party offer/deals module at all"
  - "Discount codes cannot be issued by external vendors — they apply only to Wild Apricot dues, events, or store items"
  - "No attribution, commission tracking, or partner portal"
  - "Customer base is small clubs — lower average member count reduces vendor appeal per-source"
livechannelImplication: "adjacent"
citations:
  - label: "Wild Apricot homepage"
    url: "https://www.wildapricot.com/"
  - label: "Wild Apricot features page"
    url: "https://www.wildapricot.com/features"
  - label: "Wild Apricot Help — Discounts article"
    url: "https://gethelp.wildapricot.com/en/articles/42-discounts"
  - label: "Wild Apricot pricing"
    url: "https://www.wildapricot.com/pricing"
  - label: "Personify acquires Wild Apricot (PRWeb, 2017)"
    url: "https://www.prweb.com/releases/personify_acquires_wild_apricot_scales_mission_to_serve_constituent_focused_organizations/prweb14714303.htm"
lastReviewed: "2026-04-20"
---

# Wild Apricot

## What they do
Wild Apricot is a self-serve, low-price membership management platform aimed at the smallest end of the association/club/nonprofit market — running groups, hobby clubs, alumni chapters, small professional societies, and local nonprofits. It bundles a website builder, member database, dues billing, event registration, email blasts, and a simple online store. Pricing is flat-rate and tiered by contact count, starting around $25/month for 50 contacts and scaling up to 50,000-contact enterprise plans. Ownership lineage: Wild Apricot was acquired by Personify in 2017, and Personify was acquired by Momentive Software (owner of YourMembership) in early 2026, putting Wild Apricot and YourMembership under the same corporate roof.

Zooming in on member-deals: there is effectively no member-perks module. The word "discount" in the Wild Apricot product refers exclusively to internal coupon codes that reduce the price of the association's *own* offerings.

## The member-deals capability
Wild Apricot ships a coupon-code system documented in their Help Center's "Discounts" article. These codes apply to: (1) membership applications and renewals at specific membership levels, (2) event registrations, and (3) job board postings. That is the full scope. The codes are for the association to run its own promotions — "$10 off a workshop registration," "20% off renewal" — not for delivering third-party vendor offers to members. There is no partner marketplace, no curated deals page template, no affinity directory, no unique-code infrastructure for external brands, no transaction tracking for external vendors, and no commission reporting. Associations that want to surface third-party perks build a static "Member Benefits" page in the site editor and paste links or PDFs.

## Strengths (relative to LiveChannel's private-network play)
Wild Apricot puts authenticated member identity and a members-only website in the hands of tens of thousands of tiny organizations that could never afford a YourMembership-class AMS. That's a long-tail pool of potential private-network "sources." The member-only page restriction could host a LiveChannel-powered perks block behind auth. Organizations are already used to paying for software that delivers member value — adding perks is narratively on-brand.

## Weaknesses / gaps
Virtually the entire LiveChannel value proposition is absent: no third-party offer schema, no attribution, no commission ledger, no vendor-facing workflow, no unique-code generation for external brands. The existing "Discounts" feature is a naming-collision trap — it sounds like member perks but is actually just internal coupon codes. Wild Apricot's average source is also small (often under 500 members), which changes unit economics for vendor participation.

## LiveChannel implication
Adjacent, not competitive — the feature overlap is zero. Wild Apricot owns a huge long tail of small sources with authenticated members but gives them no real tool to deliver vendor perks. A LiveChannel embed or SSO integration on the Wild Apricot member page would be additive, not cannibalistic. The more interesting angle is corporate: with Wild Apricot and YourMembership now both under Momentive Software as of 2026, a single LiveChannel partnership at the parent level could reach the full small-and-mid association spectrum.
