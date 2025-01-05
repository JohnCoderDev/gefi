import { TestBed } from '@angular/core/testing';

import { GefiBenefitService } from './gefi-benefit.service';

describe('GefiBenefitService', () => {
  let service: GefiBenefitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiBenefitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
