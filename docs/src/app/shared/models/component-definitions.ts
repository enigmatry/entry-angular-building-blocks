import { RouteSegments } from './route-segments';

interface IComponentDefinition {
    label: string;
    shortDescription: string;
    route: string;
}

const COMPONENT_DEFINITIONS: IComponentDefinition[] = [
    {
        label: 'Dialog',
        shortDescription: `Enables alert & confirm dialogs`,
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
