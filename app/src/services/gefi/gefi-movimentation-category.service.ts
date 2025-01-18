import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { Observable, tap, concatMap, of, catchError } from 'rxjs';
import { MovimentationCategory } from './definitions/movimentation-category';
import { MovimentationCategoryRules } from './rules/movimentation-category/movimentation-category-rules';
import { ResponseRules } from './rules/response/response-rules';

@Injectable({
  providedIn: 'root'
})
export class GefiMovimentationCategoryService {
  fetcher: GefiFetchService;

  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "MovimentationCategory";
  }

  getCategory(categoryName: string, signal: number): Observable<any> {
    return this.fetcher.get(`name=${categoryName}&signal=${signal}`).pipe(
      tap(response => { ResponseRules.applyRules(response, 'movimentation-category') }),
      concatMap(response => of(response.body[0])),
    )
  }

  createCategory(category: MovimentationCategory): Observable<any> {
    MovimentationCategoryRules.applyRules(category);
    return this.getCategory(category.name, category.signal).pipe(
      catchError(_ => this.fetcher.post(category).pipe(concatMap(response => of(response.body)))),
    );
  }

  getAllCategories(): Observable<any> {
    return this.fetcher.get().pipe(
      concatMap(response => of(response.body)),
    );
  }
}
