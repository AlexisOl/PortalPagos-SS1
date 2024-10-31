import { TestBed } from '@angular/core/testing';

import { ServiciosEmpresaService } from './servicios-empresa.service';

describe('ServiciosEmpresaService', () => {
  let service: ServiciosEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
