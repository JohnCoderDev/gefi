import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GefiMovementsService {
  fetcher: GefiFetchService;
  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "Movements";
  }

  getSpentsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    return this.fetcher.get(`date_movement__gte=${startOfMonth}&movimentation_categories__signal=-1`);
  }

  getEarnsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    return this.fetcher.get(`date_movement__gte=${startOfMonth}&movimentation_categories__signal=1`);
  }

  getMovementsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    return this.fetcher.get(`date_movement__gte=${startOfMonth}`);
  }
}
