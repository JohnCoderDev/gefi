import { TestBed } from '@angular/core/testing';

import { GefiBenefitedService } from './gefi-benefited.service';

describe('GefiBenefitedService', () => {
  let service: GefiBenefitedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiBenefitedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
