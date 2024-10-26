import { Routes } from '@angular/router';
import { RegistroUsuariosComponent } from './usuarios/registro-usuarios/registro-usuarios.component';

export const routes: Routes = [
  { path: 'register', component: RegistroUsuariosComponent },
  { path: '**', redirectTo: '/register', pathMatch: 'full' },
];
