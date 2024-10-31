import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ServiciosAuthService {
  private usuarioDirectiva = 'usuarios';
  readonly urlIncial = environment.URL;
  private cookieName = 'token';
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(correo: string, contrasenia: string) {
    return this.http.post(`${this.urlIncial + this.usuarioDirectiva}/login`, {
      correo,
      contrasenia,
    });
  }

  // para el token

  // elementos para las cookies
  //guardo Token en cookie
  saveToken(token: string): void {
    this.cookieService.set(this.cookieName, token, undefined, '/');
  }

  //obtengo todo el token jwt
  public getToken(): string | null {
    return this.cookieService.get(this.cookieName);
  }

  //decodifico el token y devuelvo el objeto
  private decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  //cerrar sesion -> eliminar la cookie
  logout(): void {
    this.cookieService.delete(this.cookieName, '/');
    this.router.navigate(['/']);
  }

  getIdUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      return decodedToken.id;
    }
    return null;
  }

  public getIdTipoUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.tipo) {
      return decodedToken.tipo;
    }
    return null;
  }

  getNombreUsuario(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.nombreUsuario) {
      return decodedToken.nombreUsuario;
    }
    return null;
  }

  getIATToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.iat) {
      return decodedToken.iat;
    }
    return null;
  }

  getExpToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp;
    }
    return null;
  }
  getA2f(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.a2fActivo) {
      return decodedToken.a2fActivo;
    }
    console.log(decodedToken.a2fActivo);
    return null;
  }

  getNombre(): boolean | null {
    const decodedToken = this.decodeToken();
    console.log(decodedToken);

    if (decodedToken && decodedToken.nombreUsuario) {
      return decodedToken.nombreUsuario;
    }
    return null;
  }

  getCorreo(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.correo) {
      return decodedToken.correo;
    }
    return null;
  }

  getFechaCreacion(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.fechaCreacion) {
      return decodedToken.fechaCreacion;
    }
    return null;
  }
}
