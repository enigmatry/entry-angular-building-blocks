export interface IHideExpressionDictionary<T> {
    [key: string]: (model: T, formState: any, field: any | undefined) => boolean;
}
