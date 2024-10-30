import { Component } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';

@Component({
  selector: 'app-vista-general',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.scss',
})
export class VistaGeneralComponent {
  usuarios: any[] = [
    { id: 1, name: 'Alexis', email: 'alexis@example.com', role: 'Admin' },
    { id: 2, name: 'Pedro', email: 'pedro@example.com', role: 'User' },
    { id: 3, name: 'Randy', email: 'randy@example.com', role: 'Moderator' },
  ];
}
