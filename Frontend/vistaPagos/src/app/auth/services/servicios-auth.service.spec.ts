import { TestBed } from '@angular/core/testing';

import { ServiciosAuthService } from './servicios-auth.service';

describe('ServiciosAuthService', () => {
  let service: ServiciosAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
