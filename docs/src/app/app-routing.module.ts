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
    path: RouteSegments.search_filter,
    loadChildren: () => import('./features/search-filter/search-filter.module').then(module => module.SearchFilterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
