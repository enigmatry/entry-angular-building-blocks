export interface IValidationProblemDetails {
    [key: string]: any;
    errors?: { [key: string]: string[] };
}
