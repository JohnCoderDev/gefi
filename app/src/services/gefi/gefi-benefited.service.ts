import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { Benefited, BenefitedCategory } from './definitions/benefited';
import { ResponseRules } from './rules/response/response-rules';
import { BenefitedRules } from './rules/benefited/benefited-rules';

@Injectable({
  providedIn: 'root'
})
export class GefiBenefitedService {
  fetcher: GefiFetchService;
  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "Benefited";
  }

  updateBenefited(data: Benefited): Observable<any> {
    BenefitedRules.applyRules(data);
    return this.getBenefited(data.name, data.benefited_category).pipe(
      concatMap(benefited => {
        const newBenefitedData: Benefited = {
          name: data.name,
          benefited_category: data.benefited_category !== benefited.benefited_category ? BenefitedCategory.both : data.benefited_category,
          movimentation_categories: benefited.movimentation_categories.concat(data.movimentation_categories)
        }
        return this.fetcher.patch(benefited.name, newBenefitedData).pipe(concatMap(
          response => of(response.body)
        ));
      }),
      catchError(error => {
        if (error.status !== 404) throw error;
        return this.fetcher.post(data).pipe(concatMap(
          response => of(response.body)
        ));
      })
    )
  }

  getAllBenefiteds(): Observable<any> {
    return this.fetcher.get().pipe(concatMap(response => of(response.body)));
  }
  getBenefited(benefitedName: string, benefitedCategory: number): Observable<any> {
    return this.fetcher.get(`name=${benefitedName}&benefited_category=${benefitedCategory}`).pipe(
      tap(response => { ResponseRules.applyRules(response, 'benefited') }),
      concatMap(response => of(response.body[0])),
    );
  };
}
