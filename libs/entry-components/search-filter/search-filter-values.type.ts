/**
 * One search filter's value inside the form model.
 *
 * @remarks `undefined` is excluded deliberately. In signal forms a model key whose value is
 * `undefined` gets no field at all, and writing `undefined` into a live field destroys its node -
 * taking `touched`, `dirty` and any server error with it. `null` and `''` both keep the node.
 */
export type SearchFilterValue = string | number | boolean | Date | readonly unknown[] | null;

/** The search filter form's model: one entry per bound filter, keyed by `SearchFilterBase.key`. */
export type SearchFilterValues = Record<string, SearchFilterValue>;
