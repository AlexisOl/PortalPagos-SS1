import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { TransaccioneServicioService } from '../services/transacciones/transaccione-servicio.service';
import { ServiciosAuthService } from '../../auth/services/servicios-auth.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.scss',
})
export class TransaccionesComponent implements OnInit {
  listado: any = [];

  constructor(
    private transaccions: TransaccioneServicioService,
    private servicioAuth: ServiciosAuthService
  ) {}

  ngOnInit(): void {
    this.transaccions.listadoTotal().subscribe((data: any) => {
      console.log(data);
      data.forEach((element: any) => {
        console.log(element);

        this.listado.push(element);
      });
    });
  }
}
