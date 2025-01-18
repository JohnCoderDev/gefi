import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { concatMap, Observable, of, tap } from 'rxjs';
import { ResponseRules } from './rules/response/response-rules';
import { CurrentAccountBalance } from './definitions/current-account-balance';


@Injectable({
  providedIn: 'root'
})
export class GefiCurrentAccountBalanceService {
  fetcher: GefiFetchService;
  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "CurrentAccountBalance";
  }

  updateCurrentAccountBalance(amount: number): Observable<any> {
    return this.getCurrentAccountBalance().pipe(
      concatMap(response => {
        response.current_value += amount;
        const newData = <CurrentAccountBalance>{
          current_value: response.current_value + amount,
          currency: response.currency.name,
        };
        return this.fetcher.patch(response.id, newData, "CurrentAccountBalanceUpdate");
      })
    );
  }

  getCurrentAccountBalance(): Observable<any> {
    return this.fetcher.get().pipe(
      tap(response => { ResponseRules.applyRules(response, 'current-account-balance') }),
      concatMap(response => of(response.body[0])),
    );
  }

  getPreferedCurrency(): Observable<any> {
    return this.getCurrentAccountBalance().pipe(
      concatMap(response => of(response.currency))
    );
  }
}
