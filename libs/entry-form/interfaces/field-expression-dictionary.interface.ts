export interface IFieldExpressionDictionary<T> {
  [fieldName: string]: (model: T) => boolean;
}

export interface IFieldPropertyExpressionDictionary<T, TResult = unknown> {
  [fieldName: string]: (model: T) => TResult;
}
