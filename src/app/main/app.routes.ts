import { Routes } from '@angular/router';
import {Dashboard} from '../modules/transaction/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => Dashboard
  }
];
