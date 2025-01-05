import { TestBed } from '@angular/core/testing';

import { GefiCurrencyService } from './gefi-currency.service';

describe('GefiCurrencyService', () => {
  let service: GefiCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
