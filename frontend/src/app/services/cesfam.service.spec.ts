import { TestBed } from '@angular/core/testing';

import { CesfamService } from './cesfam.service';

describe('CesfamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CesfamService = TestBed.get(CesfamService);
    expect(service).toBeTruthy();
  });
});
