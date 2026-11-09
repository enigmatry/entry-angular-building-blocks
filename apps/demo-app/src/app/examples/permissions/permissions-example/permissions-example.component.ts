import { Component } from '@angular/core';
import { EntryPermissionDirective } from '@enigmatry/entry-components/permissions';

@Component({
    selector: 'app-permissions-example',
    templateUrl: './permissions-example.component.html',
    styleUrl: './permissions-example.component.scss',
    imports: [EntryPermissionDirective]
})
export class PermissionsExampleComponent {
}
