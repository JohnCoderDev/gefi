import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { GefiMovementsService } from '../../../services/gefi/gefi-movements.service';
import moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-chart-last-year-movements-per-month',
  imports: [NgApexchartsModule],
  templateUrl: './chart-last-year-movements-per-month.component.html',
  styleUrl: './chart-last-year-movements-per-month.component.scss'
})
export class ChartLastYearMovementsPerMonthComponent {
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
        type: "bar",
        stacked: true,
        width: 1548,
        height: 450,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      }, stroke: {
        curve: "smooth"
      },
      title: {
        text: "Gastos vs Ganhos do Último Ano",
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
    movements.getLastYearMovementsResume().subscribe(response => {
      const data = response.body;
      this.chart.updateOptions({
        series: [
          {
            name: "Total Ganhos",
            color: '#1cbd3f',
            data: data.period.reduce((p: any, c: any) => { p.push(data[c]?.earns || 0); return p; }, [])
          },
          {
            name: "Total Gastos",
            color: '#D90D1E',
            data: data.period.reduce((p: any, c: any) => { p.push(data[c]?.spents || 0); return p; }, [])
          }
        ],
        xaxis: {
          categories: data.period,
          labels: {
            formatter: (value: any) => {
              return moment(value).locale('pt-BR').format('MMM YYYY')
            }
          }
        },
        yaxis: {
          labels: {
            formatter: (value: any) => {
              return value.toFixed(2).replace('.', ',');
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (value: any) => {
            return value.toFixed(2).replace('.', ',');
          }
        }
      })
    })
  }

}
