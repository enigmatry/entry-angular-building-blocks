import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFilterComponent } from './search-filter.component';

const routes: Routes = [
	{
		path: '',
		component: SearchFilterComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFilterRoutingModule { }
