import { TestBed } from '@angular/core/testing';

import { GefiMovimentationCategoryService } from './gefi-movimentation-category.service';

describe('GefiMovimentationCategoryService', () => {
  let service: GefiMovimentationCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GefiMovimentationCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
