import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({ providedIn: 'root' })
export class MatPaginatorI18n extends MatPaginatorIntl {
    constructor() {
        super();

        /** A label for the page size selector. */
        this.itemsPerPageLabel = $localize`:@@material.paginator.items-per-page:Items per page:`;

        /** A label for the button that increments the current page. */
        this.nextPageLabel = $localize`:@@material.paginator.next-page:Next page`;

        /** A label for the button that decrements the current page. */
        this.previousPageLabel = $localize`:@@material.paginator.previous-page:Previous page`;

        /** A label for the button that moves to the first page. */
        this.firstPageLabel = $localize`:@@material.paginator.first-page:First page`;

        /** A label for the button that moves to the last page. */
        this.lastPageLabel = $localize`:@@material.paginator.last-page:Last page`;
    }

    /** A label for the range of items within the current page and the length of the whole list. */
    getRangeLabel: (page: number, pageSize: number, length: number) => string =
        (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) {
                return $localize`:@@material.paginator.empty-page:0 of ${length}:length:`;
            }

            const maxLength = Math.max(length, 0);
            const startIndex = page * pageSize;

            // If the start index exceeds the list length, do not try and fix the end index to the end.
            const endIndex = startIndex < maxLength
                ? Math.min(startIndex + pageSize, maxLength)
                : startIndex + pageSize;

            return $localize`:@@material.paginator.range:${startIndex + 1}:start: – ${endIndex}:end: of ${maxLength}:length:`;
        };
}
