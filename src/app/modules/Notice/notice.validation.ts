import { z } from 'zod';

const createNotice = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    category: z.string().optional(),
    publishDate: z.string().optional(),
    isPublished: z.string().optional().transform((val) => val === 'true'),
});

const updateNotice = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    publishDate: z.string().optional(),
    isPublished: z.string().optional().transform((val) => val === 'true'),
});

export const NoticeValidation = {
    createNotice,
    updateNotice,
};
