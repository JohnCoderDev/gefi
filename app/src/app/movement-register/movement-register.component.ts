import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GefiApiService } from '../../services/gefi/gefi-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertSnackbarComponent } from '../alert-snackbar/alert-snackbar.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-movement-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './movement-register.component.html',
  styleUrl: './movement-register.component.scss'
})
export class MovementRegisterComponent implements AfterViewInit {
  snackbar = new AlertSnackbarComponent();
  preferedCurrency = "";
  availableCurrencies = new Array();
  categories = new Array();
  benefiteds = new Array();
  benefits = new Array();
  paymentMethods = new Array();
  filteredCategories = new Array();
  filteredBenefiteds = new Array();
  filteredBenefits = new Array();
  filteredPaymentMethods = new Array();

  movementFormGroup = new FormGroup({
    movemented_value: new FormControl('', [Validators.required]),
    date_movement: new FormControl(new Date(), [Validators.required]),
    observation: new FormControl(''),
    movimentation_categories: new FormControl('', [Validators.required]),
    movimentation_signal: new FormControl(-1, [Validators.required]),
    benefited: new FormControl('', [Validators.required]),
    benefited_type: new FormControl(2, [Validators.required]),
    payment_method: new FormControl('', [Validators.required]),
    benefit: new FormControl('', [Validators.required]),
    benefit_category: new FormControl(1, [Validators.required]),
    currency: new FormControl('', [Validators.required]),
  })

  constructor(private gefiService: GefiApiService) { }

  ngAfterViewInit(): void {
    this.gefiService.get('Currency').subscribe(response => {
      this.availableCurrencies = response.body;
    })
    this.fetchServices();
  }

  fetchServices() {
    this.gefiService.get('CurrentAccountBalance').subscribe(response => {
      if (response.body.length > 0) {
        this.preferedCurrency = response.body[0].currency;
      }
      this.gefiService.get('MovimentationCategory').subscribe(response => {
        this.categories = response.body;
        this.filteredCategories = response.body;
      })
      this.gefiService.get('Benefited').subscribe(response => {
        this.benefiteds = response.body;
        this.filteredBenefiteds = response.body;
      })
      this.gefiService.get('Benefit').subscribe(response => {
        this.benefits = response.body;
        this.filteredBenefits = response.body;
      })
      this.gefiService.get('PaymentMethod').subscribe(response => {
        this.paymentMethods = response.body;
        this.filteredPaymentMethods = response.body;
      })
    })
  }

  createNewMovement(): void {
    this.gefiService.createNewMovementFromForms(this.movementFormGroup.value).subscribe({
      complete: () => {
        this.snackbar.okSnackBar('Movimentação criada com sucesso');
        this.resetValues();
        this.fetchServices();
      },
      error: error => {
        this.snackbar.okSnackBar('Não foi possível criar a movimentação');
        console.log(error);
      }
    });
  }

  filterCategories(value: any) {
    this.filteredCategories = this.categories.filter(o => o.name.toLowerCase().includes(value));
  }

  filterBenefiteds(value: any) {
    this.filteredBenefiteds = this.benefiteds.filter(o => o.name.toLowerCase().includes(value));
  }

  filterBenefits(value: any) {
    this.filteredBenefits = this.benefits.filter(o => o.name.toLowerCase().includes(value));
  }

  filterPaymentMethods(value: any) {
    this.filteredPaymentMethods = this.paymentMethods.filter(o => o.name.toLowerCase().includes(value));
  }

  changeMovimentationCategory(event: any, option: any): void {
    if (event.isUserInput) {
      this.movementFormGroup.patchValue({ movimentation_signal: option.signal })
    }
  }

  changeBenefitedType(event: any, option: any): void {
    if (event.isUserInput) {
      this.movementFormGroup.patchValue({ benefited_type: option.benefited_type })
    }
  }

  resetValues(): void {
    const current_values = { ...this.movementFormGroup.value };
    this.movementFormGroup.reset();
    this.movementFormGroup.patchValue({
      date_movement: current_values.date_movement,
      movimentation_signal: current_values.movimentation_signal,
      benefit_category: current_values.benefit_category,
      benefited_type: current_values.benefited_type,
    })
  }

  changeBenefitType(event: any, option: any): void {
    if (event.isUserInput) {
      this.movementFormGroup.patchValue({ benefit_category: option.benefit_category })
    }
  }
}
