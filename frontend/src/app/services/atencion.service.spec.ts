import { TestBed } from '@angular/core/testing';

import { AtencionService } from './atencion.service';

describe('AtencionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtencionService = TestBed.get(AtencionService);
    expect(service).toBeTruthy();
  });
});
