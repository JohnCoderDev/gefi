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
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './movement-register.component.html',
  styleUrl: './movement-register.component.scss'
})
export class MovementRegisterComponent implements AfterViewInit {
  snackbar = new AlertSnackbarComponent();
  availableCurrencies = new Array();
  preferedCurrency = "";
  categories = new Array();
  currentCategory = new Object();
  benefiteds = new Array();
  benefits = new Array();
  paymentMethods = new Array();

  movementFormGroup = new FormGroup({
    movemented_value: new FormControl('', [Validators.required]),
    date_movement: new FormControl(new Date(), [Validators.required]),
    observation: new FormControl('', []),
    movimentation_categories: new FormControl('', [Validators.required]),
    movimentation_signal: new FormControl(-1, [Validators.required]),
    benefited: new FormControl('', [Validators.required]),
    payment_method: new FormControl('', [Validators.required]),
    benefit: new FormControl('', [Validators.required]),
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
      })
      this.gefiService.get('Benefited').subscribe(response => {
        this.benefiteds = response.body;
      })
      this.gefiService.get('Benefit').subscribe(response => {
        this.benefits = response.body;
      })
      this.gefiService.get('PaymentMethod').subscribe(response => {
        this.paymentMethods = response.body;
      })
    })
  }
  createMovement(): void { }
}
