import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { PaymentMethod } from './definitions/payment-method';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { PaymentMethodRules } from './rules/payment-method/payment-method.rules';
import { ResponseRules } from './rules/response/response-rules';

@Injectable({
  providedIn: 'root'
})
export class GefiPaymentMethodService {
  fetcher: GefiFetchService;
  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "PaymentMethod";
  }

  createPaymentMethod(paymentMethod: PaymentMethod): Observable<any> {
    PaymentMethodRules.applyRules(paymentMethod);
    return this.getPaymentMethod(paymentMethod.name).pipe(
      catchError(_ => this.fetcher.post(paymentMethod).pipe(concatMap(response => of(response.body))))
    )
  }

  getPaymentMethod(name: string): Observable<any> {
    return this.fetcher.get(`name=${name}`).pipe(
      tap(response => { ResponseRules.applyRules(response, 'payment-method') }),
      concatMap(response => of(response.body[0]))
    )
  }

  getAllPaymentMethods(): Observable<any> {
    return this.fetcher.get().pipe(concatMap(response => of(response.body)))
  }
}
