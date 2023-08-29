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
        label: 'File input',
        shortDescription: `Enables built-in dialogs and adds support for building custom ones.`,
        route: RouteSegments.fileInput,
        readmePath: '/entry-components/file-input/README.md',
        apiDocsPath: ''
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
        label: 'Toolbar',
        shortDescription: `Container for the application header elements like menu items and title or logo.`,
        route: RouteSegments.toolbar,
        readmePath: '/entry-components/toolbar/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/toolbar_public_api.md'
    },
    {
        label: 'Validation',
        shortDescription: `Enables mapping server/client side validation messages to Reactive/Formly forms.`,
        route: RouteSegments.validation,
        readmePath: '/entry-components/validation/README.md',
        apiDocsPath: 'assets/api/@enigmatry/entry-components/validation_public_api.md'
    }
];

export {
    IComponentDefinition,
    COMPONENT_DEFINITIONS
};
