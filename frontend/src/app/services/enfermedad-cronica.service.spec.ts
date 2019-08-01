import { TestBed } from '@angular/core/testing';

import { EnfermedadCronicaService } from './enfermedad-cronica.service';

describe('EnfermedadCronicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnfermedadCronicaService = TestBed.get(EnfermedadCronicaService);
    expect(service).toBeTruthy();
  });
});
