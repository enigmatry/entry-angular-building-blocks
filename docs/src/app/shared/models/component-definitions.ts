import { RouteSegments } from './route-segments';

interface IComponentDefinition {
    label: string;
    shortDescription: string;
    route: string;
    readmePath: string;
    apiDocsPath: string;
}

const COMPONENT_DEFINITIONS: IComponentDefinition[] = [
    {
        label: 'Dialog',
        shortDescription: `Enables built-in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog,
        readmePath: '/entry-components/dialog/README.md',
        apiDocsPath: 'assets/api/modules/Entry_Components.dialog_public_api.html'
    },
    {
        label: 'Header',
        shortDescription: `Simple way of standard header layout and styling.`,
        route: RouteSegments.header,
        readmePath: '/entry-components/header/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Search filter',
        shortDescription: `Search filter component.`,
        route: RouteSegments.searchFilter,
        readmePath: '/entry-components/search-filter/README.md',
        apiDocsPath: ''
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
