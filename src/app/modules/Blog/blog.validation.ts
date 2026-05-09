import { z } from "zod";

const createBlogValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(255),
    slug: z.string().max(255).optional(),
    shortDescription: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    featuredImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
    seoMetaTitle: z.string().max(160).optional(),
    seoMetaDescription: z.string().max(320).optional(),
  }),
});

const updateBlogValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    slug: z.string().max(255).optional(),
    shortDescription: z.string().optional(),
    content: z.string().min(1).optional(),
    featuredImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
    seoMetaTitle: z.string().max(160).optional(),
    seoMetaDescription: z.string().max(320).optional(),
  }),
});

export const BlogValidation = {
  createBlogValidation,
  updateBlogValidation,
};