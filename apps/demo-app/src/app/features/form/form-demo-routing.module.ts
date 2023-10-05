import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDemoComponent } from './form-demo.component';

const routes: Routes = [{
  path: '',
  component: FormDemoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
