import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GefiApiService } from '../../services/gefi/gefi-api.service';
import { AlertSnackbarComponent } from '../alert-snackbar/alert-snackbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-currency-register',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './currency-register.component.html',
  styleUrl: './currency-register.component.scss',
  standalone: true
})
export class CurrencyRegisterComponent implements AfterViewInit {
  displayedColumns: string[] = ['delete', 'name', 'symbol'];
  hasData: boolean = false;
  snackbar: AlertSnackbarComponent = new AlertSnackbarComponent();
  dataSource = new MatTableDataSource();
  currencyFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    symbol: new FormControl('', [Validators.required])
  })

  constructor(private gefiService: GefiApiService) { }
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit(): void {
    this.updateCurrencies();
  }

  saveCurrencyData(): void {
    if (!this.currencyFormGroup.valid) {
      this.snackbar.okSnackBar('Preencha todos os campos');
      return;
    }

    this.currencyFormGroup.value.symbol = this.currencyFormGroup.value.symbol?.toUpperCase();
    this.gefiService
      .post('Currency', this.currencyFormGroup.value)
      .subscribe(
        {
          next: _ => {
            this.updateCurrencies();
            this.resetForms();
            this.snackbar.okSnackBar('Moeda criada com sucesso!');
          },
          error: error => {
            const errorMessage = Object.values(error?.error ?? { erro: 'Não foi possível obter os dados' })[0];
            this.snackbar.okSnackBar(String(errorMessage));
          }
        }
      )
  }

  updateCurrencies(): void {
    this.gefiService.get('Currency').subscribe(response => {
      this.dataSource.data = response.body;
      this.hasData = response.body.length > 0;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteCurrency(currencyName: string): void {
    this.gefiService.delete(`Currency/${currencyName}`).subscribe({
      next: _ => {
        this.updateCurrencies();
        this.snackbar.okSnackBar('moeda deletada com sucesso');
      },
      error: _ => {
        this.snackbar.okSnackBar('não foi possível deletar a moeda');
      }
    })
  }

  resetForms(): void {
    this.currencyFormGroup.reset();
  }
}
