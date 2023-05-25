import { RouteSegments } from './route-segments';

interface IComponentDefinition {
    label: string;
    shortDescription: string;
    route: string;
}

const COMPONENT_DEFINITIONS: IComponentDefinition[] = [
    {
        label: 'Dialog',
        shortDescription: `Enables built in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog
    },
    {
        label: 'Header',
        shortDescription: `???`,
        route: RouteSegments.header
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
