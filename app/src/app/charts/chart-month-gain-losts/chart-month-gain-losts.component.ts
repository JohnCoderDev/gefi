import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { GefiMovementsService } from '../../../services/gefi/gefi-movements.service';


@Component({
  selector: 'app-chart-month-gain-losts',
  imports: [NgApexchartsModule],
  templateUrl: './chart-month-gain-losts.component.html',
  styleUrl: './chart-month-gain-losts.component.scss'
})
export class ChartMonthGainLostsComponent implements OnChanges {
  @Input() inputData !: Object;
  @ViewChild('chart') chart !: ChartComponent;

  earnsData = new Array();
  spentsData = new Array();
  public chartOptions: any;

  constructor(private movements: GefiMovementsService) {
    this.chartOptions = {
      series: [],
      noData: {
        text: "Sem dados para mostrar",
        align: 'center',
        verticalAlign: 'middle',
      },
      chart: {
        foreColor: "var(--mat-sys-on-surface)",
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Gastos vs Ganhos Este Mês",
        align: "center"
      },
      tooltip: {
        theme: 'dark',
      },
      markers: {
        size: 6
      },
      grid: {
        show: true,
        borderColor: "var(--mat-sys-outline-variant)"
      },
    }
    this.updateData();
  }

  updateData(): void {
    this.movements.getResumedMovementsThisMonth().subscribe(
      response => {
        this.chart.updateOptions({
          series: [
            {
              name: 'Ganhos',
              color: '#1cbd3f',
              data: response.earns
            },
            {
              name: 'Gastos',
              color: '#D90D1E',
              data: response.spents
            }
          ],
        })
      }
    )
  }
  ngOnChanges(changes: any): void {
    if (changes.inputData?.currentValue) {
      this.updateData();
      const currentValue = changes.inputData.currentValue;
      this.chart.updateOptions({
        chart: {
          width: currentValue.width,
          height: currentValue.height
        },
        yaxis: {
          labels: {
            formatter: (value: any) => {
              return `${currentValue.currentCurrencySymbol} ${value.toFixed(2).replace('.', ',')}`;
            }
          },
        },
        xaxis: {
          type: 'datetime',
          min: currentValue.startOfMonth,
          max: currentValue.endOfMonth,
          tickAmount: currentValue.daysInThisMonth,
          labels: {
            formatter: (value: any) => {
              return moment(value).locale('pt-br').format('DD MMM');
            },
            rotate: -60,
            rotateAlways: true
          }
        },
      })
    }
  }
}
