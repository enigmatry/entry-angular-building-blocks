/* eslint-disable max-len */
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
    loadComponent: () => import('./features/button/button-documentation.component').then(m => m.ButtonDocumentationComponent)
  },
  {
    path: RouteSegments.common,
    loadComponent: () => import('./features/common/common-documentation.component').then(m => m.CommonDocumentationComponent)
  },
  {
    path: RouteSegments.chat,
    loadComponent: () => import('./features/chat/chat-documentation.component').then(m => m.ChatDocumentationComponent)
  },
  {
    path: RouteSegments.dialog,
    loadComponent: () => import('./features/dialog/dialog-documentation.component').then(m => m.DialogDocumentationComponent)
  },
  {
    path: RouteSegments.fileInput,
    loadComponent: () => import('./features/file-input/file-input-documentation.component').then(m => m.FileInputDocumentationComponent)
  },
  {
    path: RouteSegments.form,
    loadComponent: () => import('./features/form/form-documentation.component').then(m => m.FormDocumentationComponent)
  },
  {
    path: RouteSegments.spinner,
    loadComponent: () => import('./features/spinner/spinner-documentation.component').then(m => m.SpinnerDocumentationComponent)
  },
  {
    path: RouteSegments.permissions,
    loadComponent: () => import('./features/permissions/permissions-documentation.component').then(m => m.PermissionsDocumentationComponent)
  },
  {
    path: RouteSegments.searchFilter,
    loadComponent: () => import('./features/search-filter/search-filter-documentation.component').then(m => m.SearchFilterDocumentationComponent)
  },
  {
    path: RouteSegments.table,
    loadComponent: () => import('./features/table/table-documentation.component').then(m => m.TableDocumentationComponent)
  },
  {
    path: RouteSegments.validation,
    loadComponent: () => import('./features/validation/validation-documentation.component').then(m => m.ValidationDocumentationComponent)
  },
  {
    path: RouteSegments.dateTimePicker,
    loadComponent: () => import('./features/date-time-picker/date-time-picker-documentation.component').then(m => m.DateTimePickerDocumentationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
