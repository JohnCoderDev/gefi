import { AfterContentInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GefiApiService } from '../../services/gefi/gefi-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertSnackbarComponent } from '../alert-snackbar/alert-snackbar.component';

@Component({
  selector: 'app-initial-register',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective
  ],
  templateUrl: './initial-register.component.html',
  styleUrl: './initial-register.component.scss'
})
export class InitialRegisterComponent implements AfterContentInit {
  registeredData !: object;
  availableCurrencies: Array<any> = [];
  currentAccountBalance: any;
  snackbar: AlertSnackbarComponent = new AlertSnackbarComponent();

  initialRegisterFormGroup = new FormGroup(
    {
      current_value: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required])
    }
  )

  constructor(private gefiService: GefiApiService) { }

  ngAfterContentInit(): void {
    this.getCurrentAccountBalance();
    this.gefiService.get('Currency').subscribe(response => {
      this.availableCurrencies = response.body;
    })
  }

  getCurrentAccountBalance(): void {
    this.gefiService.get('CurrentAccountBalance').subscribe(response => {
      if (response.body.length > 0) {
        this.currentAccountBalance = response.body[0];
        this.initialRegisterFormGroup.patchValue({
          current_value: this.currentAccountBalance.current_value,
        });
      }
    })
  }

  updateCurrentAccountBalance(): void {
    const updateData = {
      next: (_: any) => {
        this.snackbar.okSnackBar('Dados atualizados com sucesso');
        this.getCurrentAccountBalance();
      },
      error: (_: any) => {
        this.snackbar.okSnackBar('Não foi possível atualizar os dados');
      }
    }

    if (!this.currentAccountBalance) {
      this.gefiService
        .post('CurrentAccountBalance', this.initialRegisterFormGroup.value)
        .subscribe(updateData)
    } else {
      this.gefiService
        .patch(
          `CurrentAccountBalance/${this.currentAccountBalance.id}`,
          this.initialRegisterFormGroup.value
        )
        .subscribe(updateData)
    }
  }
}
