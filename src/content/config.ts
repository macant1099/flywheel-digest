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
    category: z.enum(['affiliate-networks', 'verticals', 'industry', 'livechannel']),
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

export const collections = { vendors, research, briefings, newsletters };
