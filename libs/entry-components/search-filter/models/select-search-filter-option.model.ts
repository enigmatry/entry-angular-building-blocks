/** Model used to populate select filter options. */
export class SelectSearchFilterOption {
    constructor(
        /** Key used as a value for selected option */
        public key: any | undefined,
        /** String value used as display label of select option */
        public label: string) {}
}
