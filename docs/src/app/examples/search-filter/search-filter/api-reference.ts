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
