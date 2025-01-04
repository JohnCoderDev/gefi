import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip,
};

@Component({
  selector: 'app-dashboard-gain-vs-loss',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard-gain-vs-loss.component.html',
  styleUrl: './dashboard-gain-vs-loss.component.scss'
})
export class DashboardGainVsLossComponent {
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        foreColor: "var(--mat-sys-on-surface)",
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#fff"],
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Product Trends by Month",
        align: "center"
      },
      tooltip: {
        theme: 'dark',
      },
      grid: {
        row: {
          colors: ["var(--mat-sys-surface)", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    }
  }
}
