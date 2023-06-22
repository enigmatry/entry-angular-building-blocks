/**
 * Defines the api used as a container for server side validation errors.
 */
export interface IValidationProblemDetails {
    [key: string]: any;
    errors?: { [key: string]: string[] };
}
