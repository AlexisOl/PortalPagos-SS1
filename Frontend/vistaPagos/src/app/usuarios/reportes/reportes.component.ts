import { Component, OnInit } from '@angular/core';
import { ReportesServicioService } from '../services/Reportes/reportes-servicio.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { ServiciosAuthService } from '../../auth/services/servicios-auth.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent implements OnInit {
  erroresTransacciones: any;
  gananciasGenerales: any;
  historicoMovimientos: any;
  ingresosEgresos: any;
  usuariosPorEstado: any;

  constructor(
    private reportesService: ReportesServicioService,
    private servicioAuth: ServiciosAuthService
  ) {}

  ngOnInit(): void {
    this.obtenerReporteErroresTransacciones();
    this.obtenerReporteGananciasGenerales('2024-10-31'); // Cambia la fecha según necesites
    this.obtenerReporteHistoricoMovimientosUsuario(
      this.servicioAuth.getIdUsuario()
    ); // Cambia el ID según necesites
    this.obtenerReporteIngresosEgresos('2024-10-31'); // Cambia la fecha según necesites
    this.obtenerReporteUsuariosPorEstado();
  }

  obtenerReporteErroresTransacciones(): void {
    this.reportesService.getReporteErroresTransacciones().subscribe((data) => {
      this.erroresTransacciones = data.results; // Ajusta según la estructura de la respuesta
    });
  }

  obtenerReporteGananciasGenerales(fecha: string): void {
    this.reportesService
      .getReporteGananciasGenerales(fecha)
      .subscribe((data) => {
        this.gananciasGenerales = data.results;
      });
  }

  obtenerReporteHistoricoMovimientosUsuario(idUsuario: number | null): void {
    this.reportesService
      .getReporteHistoricoMovimientosUsuario(idUsuario)
      .subscribe((data) => {
        console.log(data);

        this.historicoMovimientos = data.results;
      });
  }

  obtenerReporteIngresosEgresos(fecha: string): void {
    this.reportesService.getReporteIngresosEgresos(fecha).subscribe((data) => {
      console.log(data);

      this.ingresosEgresos = data.results;
    });
  }

  obtenerReporteUsuariosPorEstado(): void {
    this.reportesService.getReporteUsuariosPorEstado().subscribe((data) => {
      console.log(data);

      this.usuariosPorEstado = data.results;
    });
  }
}
