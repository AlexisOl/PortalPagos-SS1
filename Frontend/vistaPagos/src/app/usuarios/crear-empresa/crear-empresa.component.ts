import { Component } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { FormsModule } from '@angular/forms';
import { ServiciosEmpresaService } from '../services/empresa/servicios-empresa.service';

@Component({
  selector: 'app-crear-empresa',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.scss',
})
export class CrearEmpresaComponent {
  nombre!: any;
  codigo!: any;
  constructor(private empresa: ServiciosEmpresaService) {}
  generacionEmpresa() {
    this.empresa.registrarEmpresa(this.nombre, this.codigo).subscribe();
  }
}
