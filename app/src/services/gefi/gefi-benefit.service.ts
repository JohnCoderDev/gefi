import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { Benefit } from './definitions/benefit';
import { BenefitRules } from './rules/benefit/benefit-rules';
import { ResponseRules } from './rules/response/response-rules';

@Injectable({
  providedIn: 'root'
})
export class GefiBenefitService {
  fetcher: GefiFetchService;
  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "Benefit";
  }

  updateBenefit(data: Benefit): Observable<any> {
    BenefitRules.applyRules(data);
    return this.getBenefit(data.name, data.benefit_category).pipe(
      concatMap(benefit => {
        const newBenefitData: Benefit = {
          name: data.name,
          benefit_category: benefit.benefit_category,
          movimentation_categories: benefit.movimentation_categories.concat(data.movimentation_categories)
        }
        return this.fetcher.patch(benefit.id, newBenefitData).pipe(concatMap(response => of(response.body)));
      }),
      catchError(error => {
        if (error.status !== 404) throw error;
        return this.fetcher.post(data).pipe(concatMap(response => of(response.body)));
      })
    )
  }

  getBenefit(benefitName: string, benefitCategory: number): Observable<any> {
    return this.fetcher.get(`name=${benefitName}&benefit_category=${benefitCategory}`).pipe(
      tap(response => { ResponseRules.applyRules(response, 'benefit'); }),
      concatMap(response => of(response.body[0]))
    )
  }

  getAllBenefits(): Observable<any> {
    return this.fetcher.get().pipe(concatMap(response => of(response.body)));
  }
}
