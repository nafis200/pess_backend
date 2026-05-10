import { Notice, Prisma } from '@prisma/client';
import { paginationHelper } from '../../helper/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { INoticeFilterRequest } from './notice.interface';

const createNotice = async (data: any): Promise<Notice> => {
    const result = await prisma.notice.create({
        data,
    });
    return result;
};

const getAllNotices = async (
    filters: INoticeFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Notice[]>> => {
    const paginationResult = paginationHelper.calculatePagination(options);
    const limit = Number(paginationResult.limit) || 10;
    const skip = Number(paginationResult.skip) || 0;
    const page = Number(paginationResult.page) || 1;
    const sortBy = paginationResult.sortBy || 'createdAt';
    const sortOrder = paginationResult.sortOrder || 'desc';
    
    const { search, ...filterData } = filters;

    const andConditions: Prisma.NoticeWhereInput[] = [];

    if (search) {
        andConditions.push({
            OR: [
                { title: { contains: search } },
                { description: { contains: search } }
            ]
        });
    }

    if (filterData.category) {
        andConditions.push({ category: filterData.category });
    }

    if (filterData.isPublished !== undefined) {
        andConditions.push({ isPublished: filterData.isPublished === 'true' });
    }

    const whereConditions: Prisma.NoticeWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.notice.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.notice.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getSingleNotice = async (idOrSlug: string): Promise<Notice | null> => {
    const result = await prisma.notice.findFirst({
        where: {
            OR: [
                { id: idOrSlug },
                { slug: idOrSlug }
            ]
        },
    });
    return result;
};

const updateNotice = async (id: string, data: Partial<Notice>): Promise<Notice> => {
    const result = await prisma.notice.update({
        where: {
            id,
        },
        data,
    });
    return result;
};

const deleteNotice = async (id: string): Promise<Notice> => {
    const result = await prisma.notice.delete({
        where: {
            id,
        },
    });
    return result;
};

const togglePublishStatus = async (id: string): Promise<Notice> => {
    const notice = await prisma.notice.findUnique({
        where: { id }
    });

    if (!notice) {
        throw new Error("Notice not found");
    }

    const result = await prisma.notice.update({
        where: {
            id,
        },
        data: {
            isPublished: !notice.isPublished
        },
    });
    return result;
};

export const NoticeService = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
    togglePublishStatus
};
