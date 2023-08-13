import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  extraFiles = [
    {
      name: 'button-example.module.ts',
      path: 'button\\button-example.module',
      type: 'ts'
    }
  ];
}
