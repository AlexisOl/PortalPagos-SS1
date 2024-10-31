import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ServiciosUsuarioService } from '../services/usuario/servicios-usuario.service';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.scss',
})
export class RegistroUsuariosComponent {
  nombre: any;
  codigo: any;
  password: any;
  tipoUsuario: any;

  constructor(private usuario: ServiciosUsuarioService) {}

  registrarUsuuario() {
    console.log(this.nombre, this.codigo, this.password, this.tipoUsuario);
    let valor = this.tipoUsuario === 'Empresa' ? 3 : 2;

    this.usuario
      .registrarUsuario(this.nombre, this.codigo, this.password, valor)
      .subscribe();
  }
}
