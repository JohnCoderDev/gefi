import { AfterViewInit, Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GefiMovementsService } from '../../../services/gefi/gefi-movements.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-latest-movements-table',
  imports: [
    MatTableModule,
    MatIconModule,
    DatePipe,
    NgxMaskPipe
  ],
  templateUrl: './latest-movements-table.component.html',
  styleUrl: './latest-movements-table.component.scss'
})
export class LatestMovementsTableComponent implements AfterViewInit {
  @Input() inputData !: any;
  latestMovementsData = new MatTableDataSource();

  displayedColumns = [
    "arrow_signal",
    "date_movement",
    "movemented_value",
    "movimentation_categories__name",
    "benefit__name",
    "benefited__name",
    'payment_method__name',
  ];

  constructor(private movements: GefiMovementsService) { }
  ngAfterViewInit(): void {
    this.updateLatestMovements();
  }


  ngOnChanges(_: any): void {
    this.updateLatestMovements();
  }

  updateLatestMovements(): void {
    this.movements.getLatestMovements(15).subscribe(response => {
      this.latestMovementsData.data = response.body.results;
    })
  }
}
