export interface IFieldExpressionDictionary<T> {
  [fieldName: string]: (model: T) => boolean;
}

export interface IFieldPropertyExpressionDictionary<T> {
  [fieldName: string]: (model: T) => any;
}
