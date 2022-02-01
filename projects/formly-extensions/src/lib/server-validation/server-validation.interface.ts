export interface IServerValidationDetails {
    errors?: { [key: string]: string[] } | undefined;
}

export const formLevelErrorKey = 'general';
export const controlLevelErrorKey = 'fromServer';
