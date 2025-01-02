import { AfterContentInit, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GefiApiService } from '../../services/gefi/gefi-api.service';
import { AlertSnackbarComponent } from '../alert-snackbar/alert-snackbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

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
    AsyncPipe
  ],
  templateUrl: './currency-register.component.html',
  styleUrl: './currency-register.component.scss',
  standalone: true
})
export class CurrencyRegisterComponent implements AfterContentInit {
  constructor(private gefiService: GefiApiService) { }
  displayedColumns: string[] = ['name', 'symbol'];
  currenciesData$ !: Observable<any>;
  currenciesData !: any;
  hasData: boolean = false;
  alert: AlertSnackbarComponent = new AlertSnackbarComponent();
  dataSource = new MatTableDataSource();

  currencyFormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      symbol: new FormControl('', [Validators.required])
    }
  )

  async ngAfterContentInit(): Promise<void> {
    await this.updateCurrencies();
  }

  async saveCurrentCurrency(): Promise<void> {
    if (!this.currencyFormGroup.valid) {
      this.alert.openSnackBar('Preencha todos os campos', 'Ok');
      return;
    }

    this.currencyFormGroup.value.symbol = this.currencyFormGroup.value.symbol?.toUpperCase();
    const data = this.currencyFormGroup.value;
    const response = await this.gefiService.post('Currency', data);

    response.subscribe(async res => {
      if (res.status == 201) {
        this.alert.openSnackBar('Moeda criada com sucesso', 'Ok');
        this.currencyFormGroup.reset();
        await this.updateCurrencies();
      } else {
        this.alert.openSnackBar(`Erro: ${res.status}, ${JSON.stringify(res.body)}`, "Ok");
      }
    })
  }

  async updateCurrencies(): Promise<void> {
    this.currenciesData$ = this.gefiService.get('Currency');
    this.currenciesData$.subscribe(
      response => {
        this.currenciesData = response.body;
        this.dataSource.data = response.body.results;
        this.hasData = this.currenciesData.count > 0;
      },
      error => {
        console.log('erro ao carregar as moedas');
      }
    )
  }
}
