import { Routes } from '@angular/router';
import { AuthGuard } from './auth/service/auth.guard';
import { E404Component } from './modules/error/e404/e404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.routes').then(m => m.auth),
  },
  {
    path: '**',
    component: E404Component,
  }
];
