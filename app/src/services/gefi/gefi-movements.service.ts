import { Injectable } from '@angular/core';
import { GefiFetchService } from './gefi-fetch.service';
import { GefiApiService } from './gefi-api.service';
import { concatMap, Observable, of } from 'rxjs';
import { Movement } from './definitions/movement';
import { MovementsRules } from './rules/movement/movement-rules';
import moment from 'moment';
import 'moment/locale/pt-br';
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

  getMovementsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    return this.fetcher.get(`date_movement__gte=${startOfMonth}`);
  }

  getTotalsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const keys = "keys=movimentation_categories__signal";
    const values = "values=movemented_value:sum";
    const filter = `date_movement__gte=${startOfMonth}`;
    return this.fetcher.get(`${keys}&${values}&${filter}`, null, "groupby/movements").pipe(
      concatMap(response => of(response.body.reduce((p: any, c: any) => {
        const signalKey = c.movimentation_categories__signal === -1 ? "spents" : "earns";
        p[signalKey] = c.movemented_value__sum;
        return p;
      }, { earns: 0, spents: 0 })))
    )
  }

  getSpentsThisMonthPerCategorie(): Observable<any> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const keys = "keys=movimentation_categories__name";
    const values = "values=movemented_value:sum";
    const filter = `date_movement__gte=${startOfMonth}&movimentation_categories__signal=-1`;
    return this.fetcher.get(`${keys}&${values}&${filter}`, null, "groupby/movements").pipe(
      concatMap(response => of(response.body.reduce((p: any, c: any) => {
        p.labels.push(c.movimentation_categories__name);
        p.spents.push(c.movemented_value__sum);
        return p;
      }, { labels: [], spents: [] })))
    );
  }

  getResumedMovementsThisMonth(): Observable<any> {
    const startOfMonth = moment().startOf('month').format("YYYY-MM-DD");
    const keys = "keys=date_movement,movimentation_categories__signal";
    const values = "values=movemented_value:sum";
    const filters = `date_movement__gte=${startOfMonth}&order_by=date_movement`;
    return this.fetcher.get(`${keys}&${values}&${filters}`, null, "groupby/movements").pipe(concatMap(response => {
      const data = response.body;
      const splittedData = data.reduce((p: any, c: any) => {
        const signalKey = c.movimentation_categories__signal === -1 ? 'spents' : 'earns';
        p[signalKey].push({ x: moment(c.date_movement).toDate().getTime(), y: c.movemented_value__sum });
        return p;
      }, { earns: [], spents: [] })
      return of(splittedData);
    }));
  }

  getLatestMovements(limit: number): Observable<any> {
    return this.fetcher.get(`limit=${limit}`);
  }

  getResumedMonthlyMovementsLastYear(): Observable<any> {
    const startOfPeriod = moment().startOf('month').add(-1, 'year');
    const endOfPeriod = moment().startOf('month').add(1, 'month');
    const keys = "keys=date_movement__month,date_movement__year,movimentation_categories__signal";
    const values = "values=movemented_value:sum";
    const filters = `date_movement__gte=${startOfPeriod.format("YYYY-MM-DD")}&date_movement__lt=${endOfPeriod.format("YYYY-MM-DD")}`;
    let periods = []
    let period = startOfPeriod;
    while (period.toDate() < endOfPeriod.toDate()) {
      periods.push(period.format("M/YYYY"));
      period = period.add(1, 'month');
    }
    return this.fetcher.get(`${keys}&${values}&${filters}`, null, "groupby/movements").pipe(
      concatMap(response => {
        const groupedMovements: Array<any> = response.body.reduce((p: any, c: any) => {
          const monthKey = `${c.date_movement__month}/${c.date_movement__year}`;
          const signalKey = c.movimentation_categories__signal === -1 ? "spents" : "earns";
          if (!(monthKey in p)) p[monthKey] = {};
          p[monthKey][signalKey] = c.movemented_value__sum;
          return p;
        }, {});

        const groupedInArrays = periods.reduce((p: any, c: any) => {
          const movements = groupedMovements[c] ?? { earns: 0, spents: 0 };
          p.labels.push(moment(c, "M/YYYY").locale('pt-br').format('MMM/YY'));
          p.earns.push(movements?.earns ?? 0);
          p.spents.push(movements?.spents ?? 0);
          return p;
        }, { labels: [], earns: [], spents: [] })
        return of(groupedInArrays);
      }));
  }
}
