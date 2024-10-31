import { TestBed } from '@angular/core/testing';

import { TransaccioneServicioService } from './transaccione-servicio.service';

describe('TransaccioneServicioService', () => {
  let service: TransaccioneServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccioneServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
