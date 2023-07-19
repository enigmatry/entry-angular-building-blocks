import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteSegments } from './shared/models/route-segments';
import { LandingComponent } from './shared/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: RouteSegments.dialog,
    loadChildren: () => import('./features/dialog/dialog.module').then(module => module.DialogModule)
  },
  {
    path: RouteSegments.header,
    loadChildren: () => import('./features/header/header.module').then(module => module.HeaderModule)
  },
  {
    path: RouteSegments.searchFilter,
    loadChildren: () => import('./features/search-filter/search-filter.module').then(module => module.SearchFilterModule)
  },
  {
    path: RouteSegments.table,
    loadChildren: () => import('./features/table/table.module').then(module => module.TableModule)
  },
  {
    path: RouteSegments.toolbar,
    loadChildren: () => import('./features/toolbar/toolbar.module').then(module => module.ToolbarModule)
  },
  {
    path: RouteSegments.validation,
    loadChildren: () => import('./features/validation/validation.module').then(module => module.ValidationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
