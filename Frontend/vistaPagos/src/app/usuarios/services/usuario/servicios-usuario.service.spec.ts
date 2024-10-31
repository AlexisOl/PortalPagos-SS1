import { TestBed } from '@angular/core/testing';

import { ServiciosUsuarioService } from './servicios-usuario.service';

describe('ServiciosUsuarioService', () => {
  let service: ServiciosUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
