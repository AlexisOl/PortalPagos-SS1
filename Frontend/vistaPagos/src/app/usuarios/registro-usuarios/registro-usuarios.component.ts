import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.scss',
})
export class RegistroUsuariosComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('User data', this.registrationForm.value);
      // Aquí puedes enviar los datos al servidor.
    }
  }
}
