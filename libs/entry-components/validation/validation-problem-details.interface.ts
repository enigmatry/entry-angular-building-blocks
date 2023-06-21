/**
 * Defines the api, a sub-set of `Microsoft.AspNetCore.Mvc.ValidationProblemDetails` class,
 *  which used as a container for server side validation errors.
 */
export interface IValidationProblemDetails {
    [key: string]: any;
    errors?: { [key: string]: string[] };
}
