/** An ASP.NET Core validation error response: RFC 7807 problem details plus the messages per field in `errors`. */
export interface IValidationProblemDetails {
    [key: string]: unknown;
    type?: string | null;
    title?: string | null;
    status?: number | null;
    detail?: string | null;
    instance?: string | null;
    errors?: { [key: string]: string[] };
}
