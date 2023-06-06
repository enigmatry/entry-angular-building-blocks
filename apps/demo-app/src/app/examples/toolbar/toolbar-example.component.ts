import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss']
})
export class ToolbarExampleComponent {
  hideTitle = false;
  openInNewTab = true;
  showLogo = false;
  menuItems: string[] = [ 'Home', 'Products', 'Pricing', 'About' ];
}
