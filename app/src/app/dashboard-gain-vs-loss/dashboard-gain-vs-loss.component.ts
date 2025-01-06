import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ChartMonthGainLostsComponent } from '../charts/chart-month-gain-losts/chart-month-gain-losts.component';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';
import { GefiWaiterService } from '../../services/gefi/gefi-waiter.service';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { concat, tap } from 'rxjs';
import moment from 'moment';
import { ChartMainSpentsCategoriesComponent } from '../charts/chart-main-spents-categories/chart-main-spents-categories.component';
import { LatestMovementsTableComponent } from '../tables/latest-movements-table/latest-movements-table.component';
import { ChartLastYearMovementsPerMonthComponent } from '../charts/chart-last-year-movements-per-month/chart-last-year-movements-per-month.component';

@Component({
  selector: 'app-dashboard-gain-vs-loss',
  imports: [
    ChartMonthGainLostsComponent,
    ChartMainSpentsCategoriesComponent,
    ChartLastYearMovementsPerMonthComponent,
    MatCardModule,
    MatIconModule,
    LatestMovementsTableComponent,
    NgxMaskPipe,
  ],
  templateUrl: './dashboard-gain-vs-loss.component.html',
  styleUrl: './dashboard-gain-vs-loss.component.scss'
})
export class DashboardGainVsLossComponent implements OnInit {
  currentAvailableValue !: number;
  currentCurrencySymbol !: string;
  movementsThisMonth !: Array<any>;
  earnsThisMonth !: Array<any>;
  spentThisMonth !: Array<any>;
  totalEarns !: number;
  totalSpents !: number;
  currencyOptions: any;

  chartSpentsEarnsMonthData !: Object;
  chartMonthMainSpentsCategories !: Object;

  constructor(
    public darkModeService: DarkThemeService,
    private gefiWaiter: GefiWaiterService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    concat(
      this.gefiWaiter.currentAccountBalance.fetcher.get().pipe(
        tap(currentBalanceResponse => {
          const data = currentBalanceResponse.body[0];
          this.currentAvailableValue = data.current_value;
          this.currentCurrencySymbol = data.currency.symbol;
          this.currencyOptions = {
            thousandSeparator: '.',
            prefix: this.currentCurrencySymbol + ' ',
            leadZero: true,
            allowNegativeNumbers: true,
            decimalMarker: ','
          }
        })
      ),
      this.gefiWaiter.movements.getMovementsThisMonth().pipe(
        tap(response => {
          this.movementsThisMonth = response.body;
          this.totalSpents = this.movementsThisMonth.reduce((p, c) => p + (c.movimentation_categories.signal === -1 ? c.movemented_value : 0), 0)
          this.totalEarns = this.movementsThisMonth.reduce((p, c) => p + (c.movimentation_categories.signal === 1 ? c.movemented_value : 0), 0)
        })
      )).subscribe({
        complete: () => {
          const startOfMonth = moment().startOf('month').toDate().getTime();
          const endOfMonth = moment().endOf('month').toDate().getTime();
          const spents = this.movementsThisMonth.filter((v) => v.movimentation_categories.signal === -1);
          const earns = this.movementsThisMonth.filter((v) => v.movimentation_categories.signal === 1);
          let category: string = '';
          const spentsPerCategorie = spents.reduce((p: { [key: string]: number }, c: any) => {
            category = c.movimentation_categories.name;
            p[category] = (category in p) ? p[category] + c.movemented_value : c.movemented_value;
            return p;
          }, {})
          let date: any;
          const summarizeData = (p: { [key: string]: any }, c: any) => {
            date = moment(c.date_movement).format('YYYY-MM-DD');
            p[date] = c.movemented_value + (date in p ? p[date] : 0)
            return p;
          }

          const earnsSummarized = earns.reduce(summarizeData, {});
          const spentsSummarized = spents.reduce(summarizeData, {});

          this.chartSpentsEarnsMonthData = {
            earns: Object.keys(earnsSummarized).reduce((p: any, c: any) => { p.push({ x: moment(c).toDate().getTime(), y: earnsSummarized[c] }); return p; }, []),
            spents: Object.keys(spentsSummarized).reduce((p: any, c: any) => { p.push({ x: moment(c).toDate().getTime(), y: spentsSummarized[c] }); return p }, []),
            daysInThisMonth: moment().daysInMonth(),
            currentCurrencySymbol: this.currentCurrencySymbol,
            startOfMonth: startOfMonth,
            endOfMonth: endOfMonth,
            width: 948,
            height: 420
          }

          this.chartMonthMainSpentsCategories = {
            spents: Object.values(spentsPerCategorie),
            categories: Object.keys(spentsPerCategorie),
            currentCurrencySymbol: this.currentCurrencySymbol,
            width: 520,
            height: 420,
          }
        }
      })
  }
}
