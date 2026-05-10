export type INotice = {
    title: string;
    description?: string;
    category: string;
    pdfUrl: string;
    fileId?: string;
    publishDate: Date;
    isPublished: boolean;
};

export type INoticeFilterRequest = {
    search?: string | undefined;
    category?: string | undefined;
    isPublished?: string | undefined;
};
