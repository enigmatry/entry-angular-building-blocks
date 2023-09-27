import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteSegments } from './features/route-segments';
import { LandingComponent } from './shared/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: RouteSegments.button,
    loadChildren: () => import('./features/button/button.module').then(module => module.ButtonModule)
  },
  {
    path: RouteSegments.dialog,
    loadChildren: () => import('./features/dialog/dialog.module').then(module => module.DialogModule)
  },
  {
    path: RouteSegments.fileInput,
    loadChildren: () => import('./features/file-input/file-input.module').then(module => module.FileInputModule)
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
    path: RouteSegments.validation,
    loadChildren: () => import('./features/validation/validation.module').then(module => module.ValidationModule)
  },
  {
    path: RouteSegments.permissions,
    loadChildren: () => import('./features/permissions/permissions.module').then(module => module.PermissionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
