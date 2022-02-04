export interface IServerValidationDetails {
    errors?: { [key: string]: string[] } | undefined;
}

export const controlLevelErrorKey = 'controlFromServer';
export const formLevelErrorKey = 'formFromServer';
