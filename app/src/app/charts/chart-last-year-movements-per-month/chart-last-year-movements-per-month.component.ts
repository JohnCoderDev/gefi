import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { GefiMovementsService } from '../../../services/gefi/gefi-movements.service';


@Component({
  selector: 'app-chart-last-year-movements-per-month',
  imports: [NgApexchartsModule],
  templateUrl: './chart-last-year-movements-per-month.component.html',
  styleUrl: './chart-last-year-movements-per-month.component.scss'
})
export class ChartLastYearMovementsPerMonthComponent {
  @Input() inputData !: Object;
  @ViewChild('chart') chart !: ChartComponent;

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
    this.updateData();
  }

  updateData(): void {
    this.movements.getResumedMonthlyMovementsLastYear().subscribe(response => {
      this.chart.updateOptions({
        series: [
          {
            name: "Total Ganhos",
            color: '#1cbd3f',
            data: response.earns
          },
          {
            name: "Total Gastos",
            color: '#D90D1E',
            data: response.spents
          }
        ],
        xaxis: {
          categories: response.labels
        },
        yaxis: {
          labels: {
            formatter: (value: any) => {
              return value.toFixed(2).replace('.', ',');
            }
          }
        },
        dataLabels: {
          enabled: false,
        }
      })
    })

  }
  ngOnChanges(changes: any) {
    if (changes.inputData?.currentValue) {
      this.updateData();
      const data = changes.inputData?.currentValue;
      const currencySymbol = data.currentCurrencySymbol;
      this.chart.updateOptions({
        yaxis: {
          labels: {
            formatter: (value: any) => {
              return currencySymbol + " " + value.toFixed(2).replace('.', ',');
            }
          }
        }
      })
    }
  }
}
