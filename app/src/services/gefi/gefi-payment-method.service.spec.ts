import { TestBed } from '@angular/core/testing';

import { GefiPaymentMethodService } from './gefi-payment-method.service';

describe('GefiPaymentMethodService', () => {
  let service: GefiPaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiPaymentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
