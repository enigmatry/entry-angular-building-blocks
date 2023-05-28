export class User implements IUser {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    createdOn?: Date;
    updatedOn?: Date;

    constructor(data?: IUser) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) { (this)[property] = (data)[property]; }
            }
        }
    }
}

export interface IUser {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    createdOn?: Date;
    updatedOn?: Date;
}

export class PagedUsers implements IPagedUsers {
    items?: User[];
    totalCount?: number;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;

    constructor(data?: IPagedUsers) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) { this[property] = data[property]; }
            }
        }
    }
}

export interface IPagedUsers {
    items?: User[];
    totalCount?: number;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}
