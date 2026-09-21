import { defineCollection, z } from 'astro:content';

const media = {
  cover: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string().default('مؤتمر'), // مؤتمر | كرنفال
    year: z.number().optional(),
    ...media,
  }),
});

const materials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    kind: z.string().optional(), // ترانيم | ألعاب | مسرحية | برنامج | بامفلت | منهج | فقرة | أخرى
    year: z.number().optional(),
    ...media,
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...media,
  }),
});

export const collections = { events, materials, pages };
