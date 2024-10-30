import { Routes } from '@angular/router';
import { RegistroUsuariosComponent } from './usuarios/registro-usuarios/registro-usuarios.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'register', component: RegistroUsuariosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'vistaUsuario',
    loadChildren: () => import('./usuarios/Usuarios.routes'),
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
