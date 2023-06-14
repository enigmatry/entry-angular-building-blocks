/** Model used to populate select filter options. */
export class SelectFilterOption<T> {
    constructor(
        /** Key used as a value for selected option */
        public key: T,
        /** String value used as display label of select option */
        public label: string) {}
}
