import { Component } from '@angular/core';

@Component({
  selector: 'app-header-example',
  templateUrl: './header-example.component.html',
  styleUrls: ['./header-example.component.scss']
})
export class HeaderExampleComponent {
  addNew = () => {
    alert('Add new clicked  ');
  };

  otherAction = () => {
    alert('Other action clicked  ');
  };
}
