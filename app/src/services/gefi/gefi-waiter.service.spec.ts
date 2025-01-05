import { TestBed } from '@angular/core/testing';

import { GefiWaiterService } from './gefi-waiter.service';

describe('GefiWaiterService', () => {
  let service: GefiWaiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiWaiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
