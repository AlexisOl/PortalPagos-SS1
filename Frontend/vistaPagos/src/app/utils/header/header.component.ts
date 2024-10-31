import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiciosAuthService } from '../../auth/services/servicios-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public token: ServiciosAuthService) {}
  cerrarSesion() {
    this.token.logout();
  }
}
