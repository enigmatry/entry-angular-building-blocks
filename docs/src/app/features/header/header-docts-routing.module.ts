import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderDocsComponent } from './header-docs.component';

const routes: Routes = [
	{
		path: '',
		component: HeaderDocsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HeaderDocsRoutingModule { }
