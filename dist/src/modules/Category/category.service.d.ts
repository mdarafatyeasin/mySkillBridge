export declare const categoryService: {
    createCategory: (payload: any) => Promise<{
        id: string;
        created_at: Date;
        update_at: Date;
        category: string;
        description: string | null;
    }>;
    getAllCategory: () => Promise<{
        id: string;
        created_at: Date;
        update_at: Date;
        category: string;
        description: string | null;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map