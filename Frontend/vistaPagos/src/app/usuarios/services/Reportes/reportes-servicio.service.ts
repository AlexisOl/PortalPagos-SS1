import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesServicioService {
  private reporteDirectiva = 'reportes';
  readonly urlIncial = environment.URL;

  constructor(private http: HttpClient) {}

  // Método para obtener el reporte de errores en transacciones
  getReporteErroresTransacciones(): Observable<any> {
    return this.http.get(
      `${this.urlIncial + this.reporteDirectiva}/reporteErroresTransacciones`
    );
  }

  // Método para obtener el reporte de ganancias generales
  getReporteGananciasGenerales(fecha: string): Observable<any> {
    return this.http.get(
      `${
        this.urlIncial + this.reporteDirectiva
      }/reporteGananciasGenerales/${fecha}`
    );
  }

  // Método para obtener el histórico de movimientos de un usuario
  getReporteHistoricoMovimientosUsuario(
    idUsuario: number | null
  ): Observable<any> {
    return this.http.get(
      `${
        this.urlIncial + this.reporteDirectiva
      }/reporteHistoricoMovimientosUsuario/${idUsuario}`
    );
  }

  // Método para obtener el reporte de ingresos y egresos
  getReporteIngresosEgresos(fecha: string): Observable<any> {
    return this.http.get(
      `${
        this.urlIncial + this.reporteDirectiva
      }/reporteIngresosEgresos/${fecha}`
    );
  }

  // Método para obtener el reporte de usuarios por estado
  getReporteUsuariosPorEstado(): Observable<any> {
    return this.http.get(
      `${this.urlIncial + this.reporteDirectiva}/reporteUsuariosPorEstado`
    );
  }
}
