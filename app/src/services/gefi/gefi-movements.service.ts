import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import moment from 'moment';
import { map, Observable } from 'rxjs';
import { Movement } from './definitions/movement';
import { MovementsRules } from './rules/movement/movement-rules';

@Injectable({
  providedIn: 'root'
})
export class GefiMovementsService {
  fetcher: GefiFetchService;

  constructor(private gefiAPIService: GefiApiService) {
    this.fetcher = new GefiFetchService(this.gefiAPIService);
    this.fetcher.basePath = "Movements";
  }

  createMovement(movement: Movement): Observable<any> {
    MovementsRules.applyRules(movement);
    return this.fetcher.post(movement, "MovementsUpdate");
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

  getLatestMovements(limit: number): Observable<any> {
    return this.fetcher.get(`limit=${limit}`);
  }

  getLastYearMovementsResume(): Observable<any> {
    const startOfPeriod = moment().startOf('month').add(-1, 'year');
    const endOfPeriod = moment().startOf('month');
    let periodsInOrder = [];
    let periodIterator = startOfPeriod;
    while (periodIterator.toDate() < endOfPeriod.toDate()) {
      periodsInOrder.push(periodIterator.format('YYYY-MM-DD'));
      periodIterator = periodIterator.add(1, 'month');
    }
    return this.fetcher.get(`date_movement__gte=${startOfPeriod.format('YYYY-MM-DD')}&date_movement__lte=${endOfPeriod.format('YYYY-MM-DD')}`).pipe(
      map(response => {
        let dateReference: string;
        let signal: number;
        let movementedValue: number;
        let data = response.body.reduce(
          (p: { [key: string]: any }, c: any) => {
            dateReference = moment(c.date_movement).startOf('month').format('YYYY-MM-DD');
            signal = c.movimentation_categories.signal;
            movementedValue = c.movemented_value;
            if (!(dateReference in p)) {
              p[dateReference] = {
                earns: signal === 1 ? movementedValue : 0,
                spents: signal === -1 ? movementedValue : 0,
              }
            } else {
              p[dateReference].earns += signal === 1 ? movementedValue : 0;
              p[dateReference].spents += signal === -1 ? movementedValue : 0;
            }
            return p;
          },
          {},
        );
        data['period'] = periodsInOrder;
        response.body = data;
        return response;
      })
    );
  }
}
