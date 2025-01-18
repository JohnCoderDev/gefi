import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { concatMap, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GefiCurrencyService {
  fetcher: GefiFetchService;

  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "Currency";
  }

  getAllCurrencies(): Observable<any> {
    return this.fetcher.get().pipe(concatMap(response => of(response.body)))
  }
}
