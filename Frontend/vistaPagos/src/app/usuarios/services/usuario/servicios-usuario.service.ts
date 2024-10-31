import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ServiciosUsuarioService {
  private reporteDirectiva = 'usuarios';
  readonly urlIncial = environment.URL;

  constructor(private http: HttpClient) {}

  obtenerUsuarioPorId(id: number | null): Observable<any> {
    return this.http.get<any>(
      `${this.urlIncial + this.reporteDirectiva}/usuarioEspecifico/${id}`
    );
  }
}
