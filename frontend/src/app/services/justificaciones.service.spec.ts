import { TestBed } from '@angular/core/testing';

import { JustificacionesService } from './justificaciones.service';

describe('JustificacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JustificacionesService = TestBed.get(JustificacionesService);
    expect(service).toBeTruthy();
  });
});
