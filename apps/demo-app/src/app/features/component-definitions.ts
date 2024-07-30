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
        label: 'Common',
        shortDescription: `Includes a set of commonly used directives, pipes, services and utilities.`,
        route: RouteSegments.common,
        readmePath: '/entry-components/common/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Chat',
        shortDescription: `Chat`,
        route: RouteSegments.chat,
        readmePath: '/entry-components/chat/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Dialog',
        shortDescription: `Enables built-in dialogs and adds support for building custom ones.`,
        route: RouteSegments.dialog,
        readmePath: '/entry-components/dialog/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/dialog_public_api.md'
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
        shortDescription: `Table component with context menu, sorting and paging`,
        route: RouteSegments.table,
        readmePath: '/entry-components/table/README.md',
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
    },
    {
        label: 'Spinner',
        shortDescription: `Loading spinner`,
        route: RouteSegments.spinner,
        readmePath: '/entry-components/spinner/README.md',
        apiDocsPath: ''
    },
    {
        label: 'Date time picker',
        shortDescription: `Date time picker component`,
        route: RouteSegments.dateTimePicker,
        readmePath: '/entry-components/date-time-picker/README.md',
        apiDocsPath: ''
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
