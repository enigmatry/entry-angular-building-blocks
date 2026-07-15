/** Model used to populate select or autocomplete options. */
export class SelectOption<T> {
    constructor(
        /** Key used as a value for selected option */
        public key: T,
        /** String value used as display label of select option */
        public label: string,
        /** Optional group name. Options sharing the same group are rendered together under a group header. */
        public group?: string) { }
}
