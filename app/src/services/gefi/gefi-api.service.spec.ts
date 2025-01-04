import { GefiApiService } from './gefi-api.service';
import { HttpClient } from '@angular/common/http';

describe('GefiApiService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GefiApiService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GefiApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
