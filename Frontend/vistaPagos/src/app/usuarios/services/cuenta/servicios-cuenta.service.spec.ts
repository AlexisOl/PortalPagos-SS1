import { TestBed } from '@angular/core/testing';

import { ServiciosCuentaService } from './servicios-cuenta.service';

describe('ServiciosCuentaService', () => {
  let service: ServiciosCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
