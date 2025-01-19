import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartMonthGainLostsComponent } from '../charts/chart-month-gain-losts/chart-month-gain-losts.component';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';
import { GefiWaiterService } from '../../services/gefi/gefi-waiter.service';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { concat, tap } from 'rxjs';
import { ChartMainSpentsCategoriesComponent } from '../charts/chart-main-spents-categories/chart-main-spents-categories.component';
import { LatestMovementsTableComponent } from '../tables/latest-movements-table/latest-movements-table.component';
import { ChartLastYearMovementsPerMonthComponent } from '../charts/chart-last-year-movements-per-month/chart-last-year-movements-per-month.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-gain-vs-loss',
  imports: [
    ChartMonthGainLostsComponent,
    ChartMainSpentsCategoriesComponent,
    ChartLastYearMovementsPerMonthComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
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

  chartMovementsMonthInput !: Object;
  chartMonthCategoriesInput !: Object;
  chartLastYearMovementsInput !: Object;
  tableLatestMovementsInput !: Object;

  constructor(
    public darkModeService: DarkThemeService,
    private gefiWaiter: GefiWaiterService
  ) { }

  ngOnInit() {
    this.updateData();
  }

  updateData(): void {
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
      this.gefiWaiter.movements.getTotalsThisMonth().pipe(
        tap(response => {
          this.totalSpents = response.spents;
          this.totalEarns = response.earns;
        })
      )).subscribe({
        complete: () => {
          const startOfMonth = moment().startOf('month').toDate().getTime();
          const endOfMonth = moment().endOf('month').toDate().getTime();

          this.chartMovementsMonthInput = {
            daysInThisMonth: moment().daysInMonth(),
            currentCurrencySymbol: this.currentCurrencySymbol,
            startOfMonth: startOfMonth,
            endOfMonth: endOfMonth,
            width: 948,
            height: 420
          }

          this.chartMonthCategoriesInput = {
            currentCurrencySymbol: this.currentCurrencySymbol,
            width: 520,
            height: 420,
          }

          this.chartLastYearMovementsInput = {
            currentCurrencySymbol: this.currentCurrencySymbol,
          }

          this.tableLatestMovementsInput = {
            changed: true,
          }
        }
      })
  }
}
