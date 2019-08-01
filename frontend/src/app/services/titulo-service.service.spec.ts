import { TestBed } from '@angular/core/testing';

import { TituloServiceService } from './titulo-service.service';

describe('TituloServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TituloServiceService = TestBed.get(TituloServiceService);
    expect(service).toBeTruthy();
  });
});
