import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import moment from 'moment';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexMarkers,
  ApexGrid,
  ChartComponent,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip,
};

@Component({
  selector: 'app-chart-month-gain-losts',
  imports: [NgApexchartsModule],
  templateUrl: './chart-month-gain-losts.component.html',
  styleUrl: './chart-month-gain-losts.component.scss'
})
export class ChartMonthGainLostsComponent implements OnChanges {
  @Input() inputData !: Object;
  @Input() usingDarkTheme !: boolean;
  @ViewChild('chart') chart !: ChartComponent;

  earnsData = new Array();
  spentsData = new Array();
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        foreColor: "var(--mat-sys-on-surface)",
        height: 350,
        type: "area",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Gastos vs Ganhos Este Mês",
        align: "left"
      },
      tooltip: {
        theme: 'dark',
      },
      markers: {
        size: 6
      },
      grid: {
        row: {
          colors: ["var(--mat-sys-surface)", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {}
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.inputData?.currentValue) {
      const currentValue = changes.inputData.currentValue;
      this.chart.updateOptions({
        colors: ['#1cbd3f', '#D90D1E'],
        yaxis: {
          labels: {
            formatter: (value: any) => {
              return `${currentValue.currentCurrencySymbol} ${value.toFixed(2).replace('.', ',')}`;
            }
          },
        },
        tooltip: {
          theme: currentValue.useDarkTheme ? 'dark' : 'default',
        },
        xaxis: {
          type: 'datetime',
          min: currentValue.startOfMonth,
          max: currentValue.endOfMonth,
          tickAmount: currentValue.daysInThisMonth,
          labels: {
            formatter: (value: any) => {
              return moment(value).format('DD MMM YYYY');
            },
            rotate: -75,
            rotateAlways: true
          }
        },
        series: [
          {
            name: 'Ganhos',
            data: currentValue.earns
          },
          {
            name: 'Gastos',
            data: currentValue.spents
          }
        ]
      })
    }
  }
}
