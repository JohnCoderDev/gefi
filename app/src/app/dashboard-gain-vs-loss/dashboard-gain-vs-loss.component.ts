import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ChartMonthGainLostsComponent } from '../charts/chart-month-gain-losts/chart-month-gain-losts.component';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';
import { GefiWaiterService } from '../../services/gefi/gefi-waiter.service';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { concat, tap } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-gain-vs-loss',
  imports: [
    ChartMonthGainLostsComponent,
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
  earnsThisMonth !: Array<any>;
  spentThisMonth !: Array<any>;
  totalEarns !: number;
  totalSpents !: number;
  currencyOptions: any;

  chartSpentsEarnsMonthData !: Object;

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
          this.gefiWaiter.currency.fetcher.get(`name=${data.currency}`).subscribe(
            currencyResponse => {
              this.currentCurrencySymbol = currencyResponse.body[0].symbol;
              this.currencyOptions = {
                thousandSeparator: '.',
                prefix: this.currentCurrencySymbol + ' ',
                leadZero: true,
                allowNegativeNumbers: true,
                decimalMarker: ','
              }
            }
          )
        })
      ),
      this.gefiWaiter.movements.getSpentsThisMonth().pipe(
        tap(response => {
          this.spentThisMonth = response.body;
          this.totalSpents = this.spentThisMonth.reduce((p, c) => p + c.movemented_value, 0)
        })
      ),
      this.gefiWaiter.movements.getEarnsThisMonth().pipe(
        tap(response => {
          this.earnsThisMonth = response.body;
          this.totalEarns = this.earnsThisMonth.reduce((p, c) => p + c.movemented_value, 0);
        })
      )).subscribe({
        complete: () => {
          const startOfMonth = moment().startOf('month').toDate().getTime();
          const endOfMonth = moment().endOf('month').toDate().getTime();
          const reduceData = (p: any, c: any) => {
            p.push({
              x: moment(c.date_movement).toDate().getTime(),
              y: c.movemented_value
            });
            return p;
          }
          this.chartSpentsEarnsMonthData = {
            earns: this.earnsThisMonth.reduce(reduceData, []),
            spents: this.spentThisMonth.reduce(reduceData, []),
            daysInThisMonth: moment().daysInMonth(),
            useDarkTheme: this.darkModeService.isUsingDarkTheme(),
            currentCurrencySymbol: this.currentCurrencySymbol,
            startOfMonth: startOfMonth,
            endOfMonth: endOfMonth
          }
        }
      })
  }
}
