/**
 * What an `entry-file-input` holds: one file, the list of them when `multiple`, or nothing.
 *
 * `null` is the empty, and `undefined` is deliberately not part of it: a signal form's model may not
 * include `undefined`, because the schema path for such a field is itself possibly-undefined and no
 * rule type-checks against it.
 */
export type FileInputValue = File | FileList | null;
