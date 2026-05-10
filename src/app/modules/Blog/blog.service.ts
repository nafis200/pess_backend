import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { Prisma } from "@prisma/client";
import httpStatus from "http-status-codes";

const generateSlug = (title: string): string => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36)
  );
};

interface BlogPayload {
  title: string;
  slug?: string;
  shortDescription?: string;
  content: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED";
  seoMetaTitle?: string;
  seoMetaDescription?: string;
}

interface BlogFilters {
  search?: string;
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}

const createBlog = async (payload: BlogPayload) => {
  const slug = payload.slug || generateSlug(payload.title);

  const existingBlog = await prisma.blog.findUnique({
    where: { slug },
  });

  const finalSlug = existingBlog ? `${slug}-${Date.now()}` : slug;

  const result = await prisma.blog.create({
    data: {
      title: payload.title,
      slug: finalSlug,
      shortDescription: payload.shortDescription,
      content: payload.content,
      featuredImage: payload.featuredImage,
      category: payload.category,
      tags: payload.tags || [],
      status: payload.status || "DRAFT",
      seoMetaTitle: payload.seoMetaTitle,
      seoMetaDescription: payload.seoMetaDescription,
    },
  });

  return result;
};

const getAllBlogs = async (filters: BlogFilters) => {
  const { search, status, category, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && (status === "PUBLISHED" || status === "DRAFT")) {
    where.status = status as "DRAFT" | "PUBLISHED";
  }

  if (category) {
    where.category = category;
  }

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { author: true },
    }),
    prisma.blog.count({ where }),
  ]);

  const blogsWithAuthor = blogs.map(blog => ({
    ...blog,
    authorName: blog.author?.name || "Admin",
    authorImage: blog.author?.profilePhoto || null,
  }));

  return {
    data: blogsWithAuthor,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleBlog = async (id: number) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return {
    ...blog,
    authorName: blog.author?.name || "FitNest Admin",
    authorImage: blog.author?.profilePhoto || null,
  };
};

const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return {
    ...blog,
    authorName: blog.author?.name || "FitNest Admin",
    authorImage: blog.author?.profilePhoto || null,
  };
};

const updateBlog = async (id: number, payload: Partial<BlogPayload>) => {
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (payload.slug && payload.slug !== existingBlog.slug) {
    const slugExists = await prisma.blog.findFirst({
      where: {
        slug: payload.slug,
        NOT: { id },
      },
    });

    if (slugExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Slug already exists");
    }
  }

  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteBlog = async (id: number) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  await prisma.blog.delete({
    where: { id },
  });

  return null;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};