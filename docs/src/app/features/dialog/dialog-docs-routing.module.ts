import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogDocsComponent } from './dialog-docs.component';

const routes: Routes = [
	{
		path: '',
		component: DialogDocsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DialogDocsRoutingModule { }
