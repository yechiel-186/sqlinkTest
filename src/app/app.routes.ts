import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Info } from './pages/info/info';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'info',
        component: Info
    }
];
