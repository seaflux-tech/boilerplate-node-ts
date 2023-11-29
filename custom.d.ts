interface User {
    id: number;
    organizationId: number;
    role: string;
}

declare namespace Express {
    export interface Request {
        me?: User,
        dto?: any
        files: any
        pager: {
            page: number,
            limit: number
        }
    }
}