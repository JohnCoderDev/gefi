import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { GefiMovementsService } from '../../../services/gefi/gefi-movements.service';

@Component({
  selector: 'app-chart-main-spents-categories',
  imports: [NgApexchartsModule],
  templateUrl: './chart-main-spents-categories.component.html',
  styleUrl: './chart-main-spents-categories.component.scss'
})
export class ChartMainSpentsCategoriesComponent {
  @Input() inputData !: Object;
  @ViewChild('chart') chart !: ChartComponent;

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
        height: 350,
        type: "pie",
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      title: {
        text: "Principais Gastos do Mês",
        align: "center"
      },
      tooltip: {
        theme: 'dark',
      },
      dataLabels: {
        formatter: (value: any) => {
          return `${value.toFixed(2).replace('.', ',')}%`
        }
      }
    }
    this.movements.getSpentsThisMonthPerCategorie().subscribe(
      response => {
        this.chart.updateOptions({
          series: response.spents,
          labels: response.labels,
        })
      }
    )
  }

  ngOnChanges(changes: any): void {
    if (changes.inputData?.currentValue) {
      const currentValue = changes.inputData.currentValue;
      this.chart.updateOptions({
        tooltip: {
          y: {
            formatter: (value: any) => {
              return `${currentValue.currentCurrencySymbol} ${value.toFixed(2).replace('.', ',')}`;
            }
          }
        },
        chart: {
          width: currentValue.width,
          height: currentValue.height,
        }
      })
    }
  }
}
