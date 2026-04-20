import { defineCollection, z } from 'astro:content';

const vendors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    emoji: z.string(),
    category: z.string(),
    platform: z.string(),
    website: z.string().url(),
    websiteDisplay: z.string(),
    afareScore: z.number().min(0).max(100),
    afareBand: z.enum(['Early', 'Developing', 'Established', 'Leading']),
    afareDimensions: z.array(z.object({
      name: z.string(),
      score: z.number(),
      maxScore: z.number().default(20),
      tagline: z.string(),
      criteria: z.array(z.object({
        name: z.string(),
        score: z.number(),
        maxScore: z.number().default(4),
        evidence: z.string(),
      })),
    })).length(5),
    strengths: z.array(z.object({ title: z.string(), description: z.string() })),
    gaps: z.array(z.object({ title: z.string(), description: z.string() })),
    assessment: z.string(),
    assessmentHighlight: z.string(),
    evaluationDate: z.string(),
    competitivePosition: z.object({
      competitors: z.array(z.object({
        name: z.string(),
        networks: z.number(),
        commissionRate: z.string(),
        cookieDuration: z.string(),
      })),
      summary: z.string(),
    }).optional(),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['affiliate-networks', 'verticals', 'industry', 'livechannel', 'network-building', 'sources']),
    summary: z.string().optional(),
    lastUpdated: z.string(),
    status: z.enum(['tracking', 'active', 'new']).default('tracking'),
    tags: z.array(z.string()).optional(),
  }),
});

const briefings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const newsletters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    week: z.number(),
    summary: z.string().optional(),
  }),
});

const playbooks = defineCollection({
  type: 'content',
  schema: z.object({
    vendor: z.string(),
    date: z.string(),
    afareScore: z.number().optional(),
    afareBand: z.string().optional(),
  }),
});

const partners = defineCollection({
  type: 'content',
  schema: z.object({
    vendor: z.string(),
    date: z.string(),
    category: z.string().optional(),
  }),
});

const players = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['network', 'platform', 'publisher', 'ai-tech', 'industry-body']),
    description: z.string(),
    website: z.string().optional(),
    founded: z.string().optional(),
    headquarters: z.string().optional(),
    keyStats: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    vendorRelevance: z.enum(['high', 'medium', 'low']).default('medium'),
    lastUpdated: z.string(),
  }),
});

const sources = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bucket: z.enum([
      'affinity-perks',
      'ams',
      'affiliate-network',
      'vertical-benchmark',
      'community-creator',
      'diy-pattern',
    ]),
    description: z.string(),
    website: z.string().optional(),
    owner: z.string().optional(),
    targetSourceType: z.array(z.enum([
      'employer',
      'professional-association',
      'club',
      'alumni',
      'consumer-membership',
      'community',
      'creator',
      'mixed',
    ])).default(['mixed']),
    sourceReach: z.string().optional(),
    pricingModel: z.string().optional(),
    vendorOnboarding: z.enum(['open-marketplace', 'curated', 'invite-only', 'mixed', 'unknown']).default('unknown'),
    exclusivityPosture: z.enum(['public-codes', 'gated', 'exclusive', 'mixed', 'unknown']).default('unknown'),
    authModel: z.string().optional(),
    dataVisibility: z.string().optional(),
    uxSurface: z.array(z.string()).optional(),
    integrationDepth: z.string().optional(),
    strengths: z.array(z.string()).optional(),
    gaps: z.array(z.string()).optional(),
    livechannelImplication: z.enum(['direct-competitor', 'adjacent', 'inspiration', 'non-threat']).default('adjacent'),
    citations: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
    lastReviewed: z.string(),
  }),
});

export const collections = { vendors, research, briefings, newsletters, playbooks, partners, players, sources };
