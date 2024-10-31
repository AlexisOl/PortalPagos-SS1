import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { ServiciosUsuarioService } from '../../services/usuario/servicios-usuario.service';
import { ServiciosAuthService } from '../../../auth/services/servicios-auth.service';
import { ServiciosCuentaService } from '../../services/cuenta/servicios-cuenta.service';
import { cuenta } from '../../../models/cuentas.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vista-general',
  standalone: true,
  imports: [HeaderComponent, DatePipe],
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.scss',
})
export class VistaGeneralComponent implements OnInit {
  usuario: any; // Puedes definir una interfaz para un tipo más específico
  cuenta: any;
  constructor(
    private usuarioService: ServiciosUsuarioService,
    private servicioAuth: ServiciosAuthService,
    private servicioCuenta: ServiciosCuentaService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario(this.servicioAuth.getIdUsuario()); // Reemplaza '123' con el ID deseado
    this.obtenerCuentas();
  }

  obtenerUsuario(id: number | null): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe((data) => {
      this.usuario = data.usuario;
    });
  }

  obtenerCuentas() {
    this.servicioCuenta
      .obtenerCuentasEspecificasCorreo(this.servicioAuth.getCorreo())
      .subscribe((data: any) => {
        this.cuenta = data.cuenta; // Asigna la respuesta a la variable de cuentas
        console.log(data); // Para depuración
      });
  }
}
