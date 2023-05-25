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
        documentationPath: 'entry-components/README.md',
    },
    {
        label: 'Header',
        shortDescription: '',
        route: RouteSegments.header,
        documentationPath: ''
    },
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
