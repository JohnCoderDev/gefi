import { TestBed } from '@angular/core/testing';

import { GefiApiService } from './gefi-api.service';

describe('GefiApiService', () => {
  let service: GefiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
