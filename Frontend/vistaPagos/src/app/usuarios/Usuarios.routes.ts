import { Routes } from '@angular/router';
import { VistaGeneralComponent } from './panelGeneral/vista-general/vista-general.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';

export const routes: Routes = [
  {
    path: '',
    component: VistaGeneralComponent,
  },
  {
    path: 'reportes',
    component: ReportesComponent,
  },
  {
    path: 'crearCuenta',
    component: CrearCuentaComponent,
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
  },
  {
    path: 'crearEmpresa',
    component: CrearEmpresaComponent,
  },
];

export default routes;
