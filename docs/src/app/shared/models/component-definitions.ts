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
        // documentationPath: 'entry-components/dialog/README.md',
        documentationPath: 'D:\\Projects\\entry-angular-building-blocks\\projects\\entry-components\\dialog\\README.md'
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
