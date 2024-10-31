import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ServiciosAuthService } from '../services/servicios-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email!: string;
  password!: string;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: ServiciosAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required],
    });
  }

  ingresarse() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Ingreso adecuado:', response);
        this.authService.saveToken(response.token);

        this.router.navigate(['/vistaUsuario/']);
        // Aquí puedes manejar la respuesta y redirigir al usuario
      },
      (error) => {
        console.error('Error en el ingreso:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  }
}
