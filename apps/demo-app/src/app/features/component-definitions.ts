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
        label: 'Button',
        shortDescription: `Used to provide button configuration on module or application level.`,
        route: RouteSegments.button,
        readmePath: '/entry-components/button/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/button_public_api.md'
    },
    {
        label: 'Dialog',
        shortDescription: `Enables built-in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog,
        readmePath: '/entry-components/dialog/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/dialog_public_api.md'
    },
    {
        label: 'Dynamic form',
        shortDescription: `Dynamic form`,
        route: RouteSegments.dynamicForm,
        readmePath: '/entry-components/dynamic-form/README.md',
        apiDocsPath: ''
    },
    {
        label: 'File input',
        shortDescription: `Component that provides a custom file input button with additional functionality`,
        route: RouteSegments.fileInput,
        readmePath: '/entry-components/file-input/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Search filter',
        shortDescription: `Search filter component with configurable input elements.`,
        route: RouteSegments.searchFilter,
        readmePath: '/entry-components/search-filter/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/search_filter_public_api.md'
    },
    {
        label: 'Table',
        shortDescription: `Reusable table component with context menu, sorting and paging`,
        route: RouteSegments.table,
        readmePath: '/entry-table/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Form',
        shortDescription: `Form demo with entry configuration`,
        route: RouteSegments.form,
        readmePath: '/entry-form/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Validation',
        shortDescription: `Enables mapping server/client side validation messages to Reactive/Formly forms.`,
        route: RouteSegments.validation,
        readmePath: '/entry-components/validation/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/validation_public_api.md'
    },
    {
        label: 'Permissions',
        shortDescription: `Permission access control for angular`,
        route: RouteSegments.permissions,
        readmePath: '/entry-components/permissions/README.md',
        apiDocsPath: ''
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
