import { Component } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { ServiciosCuentaService } from '../services/cuenta/servicios-cuenta.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cuenta } from '../../models/cuentas.interface';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss',
})
export class CrearCuentaComponent {
  idTipoCuenta!: any;
  pin!: any;
  codigo!: any;
  idUsuario!: any;
  constructor(private servicioCuenta: ServiciosCuentaService) {}

  generacionCuenta() {
    let cuenta: cuenta = {
      idUsuario: this.idUsuario,
      codigo: this.codigo,
      pin: this.pin,
      id_tipoCuentaAsociadas: this.idTipoCuenta,
    };

    this.servicioCuenta.crearCuenta(cuenta).subscribe();
  }
}
