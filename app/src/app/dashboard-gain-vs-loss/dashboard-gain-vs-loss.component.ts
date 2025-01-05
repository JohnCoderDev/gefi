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

@Component({
  selector: 'app-dashboard-gain-vs-loss',
  imports: [
    ChartMonthGainLostsComponent,
    ChartMainSpentsCategoriesComponent,
    MatCardModule,
    MatIconModule,
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

          const reduceData = (p: any, c: any) => {
            p.push({
              x: moment(c.date_movement).toDate().getTime(),
              y: c.movemented_value
            });
            return p;
          }
          this.chartSpentsEarnsMonthData = {
            earns: earns.reduce(reduceData, []),
            spents: spents.reduce(reduceData, []),
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
