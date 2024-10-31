import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiciosEmpresaService {
  private reporteDirectiva = 'empresa';
  readonly urlIncial = environment.URL;

  constructor(private http: HttpClient) {}

  registrarEmpresa(nombre_empresa: any, codigo_empresa: any): Observable<any> {
    return this.http.post<any>(
      `${this.urlIncial + this.reporteDirectiva}/crearNuevaEmpresa/`,
      {
        nombre_empresa,
        codigo_empresa,
      }
    );
  }
}
