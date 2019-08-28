import { TestBed } from '@angular/core/testing';

import { CalendarioService } from './calendario.service';

describe('CalendarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioService = TestBed.get(CalendarioService);
    expect(service).toBeTruthy();
  });
});
