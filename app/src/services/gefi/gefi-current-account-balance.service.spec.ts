import { TestBed } from '@angular/core/testing';

import { GefiCurrentAccountBalanceService } from './gefi-current-account-balance.service';

describe('GefiCurrentAccountBalanceService', () => {
  let service: GefiCurrentAccountBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiCurrentAccountBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
