import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";


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

  constructor() {
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
  }

  ngOnChanges(changes: any): void {
    if (changes.inputData?.currentValue) {
      const currentValue = changes.inputData.currentValue;
      console.log(currentValue);
      this.chart.updateOptions({
        series: [
          {
            name: 'Ganhos',
            color: '#1cbd3f',
            data: currentValue.earns
          },
          {
            name: 'Gastos',
            color: '#D90D1E',
            data: currentValue.spents
          }
        ],
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
