export interface IFieldExpressionDictionary<T> {
    [fieldName: string]: (model: T) => boolean;
}
