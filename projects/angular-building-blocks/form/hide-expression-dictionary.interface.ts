export interface IHideExpressionDictionary<T> {
    [key: string]: (model: T) => boolean;
}
