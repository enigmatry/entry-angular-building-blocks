import { RouteSegments } from './route-segments';

interface IComponentDefinition {
    label: string;
    shortDescription: string;
    route: string;
    documentationPath: string;
}

const COMPONENT_DEFINITIONS: IComponentDefinition[] = [
    {
        label: 'Dialog',
        shortDescription: `Enables built in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog,
        documentationPath: '/entry-components/dialog/README.md',
    },
    {
        label: 'Header',
        shortDescription: `Simple way of standard header layout and styling.`,
        route: RouteSegments.header,
        documentationPath: '/entry-components/header/README.md'
    },
    {
        label: 'Search filter',
        shortDescription: `Search filter component.`,
        route: RouteSegments.searchFilter,
        documentationPath: ''
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
