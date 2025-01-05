import { TestBed } from '@angular/core/testing';

import { GefiMovementsService } from './gefi-movements.service';

describe('GefiMovementsService', () => {
  let service: GefiMovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiMovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
