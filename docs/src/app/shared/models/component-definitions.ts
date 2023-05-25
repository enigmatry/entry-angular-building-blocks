import { RouteSegments } from './route-segments';

interface IComponentDefinition {
    label: string;
    shortDescription: string;
    route: string;
    documentationPath: string;
    requiredImports: string[];
}

const COMPONENT_DEFINITIONS: IComponentDefinition[] = [
    {
        label: 'Dialog',
        shortDescription: `Enables built in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog,
        documentationPath: '',
        requiredImports: [
            `import { EntryDialogModule } from '@enigmatry/entry-components/entry-dialog';`,
            `import { MatDialogModule } from '@angular/material/dialog';`
        ]
    },
    {
        label: 'Header',
        shortDescription: '',
        route: RouteSegments.header,
        documentationPath: '',
        requiredImports: []
    },
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
