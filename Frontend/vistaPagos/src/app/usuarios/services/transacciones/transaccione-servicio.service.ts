import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { cuenta } from '../../../models/cuentas.interface';

@Injectable({
  providedIn: 'root',
})
export class TransaccioneServicioService {
  private reporteDirectiva = 'transaccion';
  readonly urlIncial = environment.URL;

  constructor(private http: HttpClient) {}

  crearCuenta(cuenta: cuenta): Observable<any> {
    console.log(cuenta);

    return this.http.post<any>(
      `${this.urlIncial + this.reporteDirectiva}/crearNuevaCuenta/`,
      { cuenta }
    );
  }

  // Método para obtener cuentas específicas por correo
  listadoTotal(): Observable<any> {
    return this.http.get<any>(
      `${this.urlIncial + this.reporteDirectiva}/ListadoTransacciones/`
    );
  }
}
