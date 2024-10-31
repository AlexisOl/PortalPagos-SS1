import { TestBed } from '@angular/core/testing';

import { ReportesServicioService } from './reportes-servicio.service';

describe('ReportesServicioService', () => {
  let service: ReportesServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
