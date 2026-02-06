import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    tagline: z.string(),
    keywords: z.array(z.string()),
    nav: z.object({
      home: z.string(),
      about: z.string(),
      products: z.string(),
      applications: z.string(),
      certifications: z.string(),
      contact: z.string(),
    }),
    cta: z.object({
      contact: z.string(),
      getSpec: z.string(),
    }),
    home: z.object({
      heroTitle: z.string(),
      heroSubtitle: z.string(),
      advantages: z.array(
        z.object({
          title: z.string(),
          desc: z.string(),
        }),
      ),
      productEntrances: z.array(
        z.object({
          title: z.string(),
          href: z.string(),
        }),
      ),
      industries: z.array(z.string()),
    }),
    contactInfo: z.object({
      phone: z.string(),
      email: z.string(),
      whatsapp: z.string(),
      wechat: z.string(),
      address: z.string(),
    }),
  }),
});

export const collections = { site };

