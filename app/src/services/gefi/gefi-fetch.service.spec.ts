import { TestBed } from '@angular/core/testing';

import { GefiFetchService } from './gefi-fetch.service';

describe('GefiFetchService', () => {
  let service: GefiFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
