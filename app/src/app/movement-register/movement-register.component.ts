import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertSnackbarComponent } from '../alert-snackbar/alert-snackbar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GefiWaiterService } from '../../services/gefi/gefi-waiter.service';
import { concat, concatMap, of, tap } from 'rxjs';
import { MovimentationCategory } from '../../services/gefi/definitions/movimentation-category';
import { Movement } from '../../services/gefi/definitions/movement';
import { Benefited, BenefitedCategory } from '../../services/gefi/definitions/benefited';
import { Benefit } from '../../services/gefi/definitions/benefit';
import { PaymentMethod } from '../../services/gefi/definitions/payment-method';
import moment from 'moment';

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
    MatProgressBarModule,
    MatRadioModule,
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './movement-register.component.html',
  styleUrl: './movement-register.component.scss'
})
export class MovementRegisterComponent implements AfterViewInit {
  snackbar = new AlertSnackbarComponent();
  availableCurrencies = new Array();
  categories = new Array();
  benefiteds = new Array();
  benefits = new Array();
  paymentMethods = new Array();
  filteredCategories = new Array();
  filteredBenefiteds = new Array();
  filteredBenefits = new Array();
  filteredPaymentMethods = new Array();
  progressBarVisible = false;

  @ViewChild('movementedValue') movementedValueField!: ElementRef;
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

  constructor(private waiter: GefiWaiterService) { }

  ngAfterViewInit(): void {
    this.updateData();
  }


  updateData() {
    concat(
      this.waiter.currency.getAllCurrencies().pipe(
        tap(currencies => this.availableCurrencies = currencies)
      ),
      this.waiter.currentAccountBalance.getPreferedCurrency().pipe(
        tap(currency => { this.movementFormGroup.patchValue({ currency: currency.name }) }),
      ),
      this.waiter.movimentationCategory.getAllCategories().pipe(
        tap(categories => this.categories = categories)
      ),
      this.waiter.benefited.getAllBenefiteds().pipe(
        tap(benefiteds => this.benefiteds = benefiteds)
      ),
      this.waiter.benefit.getAllBenefits().pipe(
        tap(benefits => this.benefits = benefits)
      ),
      this.waiter.paymentMethod.getAllPaymentMethods().pipe(
        tap(paymentMethods => this.paymentMethods = paymentMethods)
      )
    ).subscribe({ error: console.error })
  }

  createNewMovement(): void {
    const data = this.movementFormGroup.value;
    const movimentationCategory: MovimentationCategory = {
      name: data.movimentation_categories || '',
      signal: data.movimentation_signal || -1,
      active: true
    }
    this.progressBarVisible = true;
    this.waiter.movimentationCategory.createCategory(movimentationCategory).pipe(
      concatMap(category => {
        const benefited: Benefited = {
          name: data.benefited || '',
          benefited_type: data.benefited_type || 1,
          benefited_category: data.movimentation_signal === -1 ? BenefitedCategory.supplier : BenefitedCategory.client,
          movimentation_categories: [category.id]
        }
        return this.waiter.benefited.updateBenefited(benefited).pipe(
          concatMap(benefited => of({
            category: <MovimentationCategory>category,
            benefited: <Benefited>benefited,
          })
          ))
      }),
      concatMap(response => {
        const benefit: Benefit = {
          name: data.benefit || '',
          benefit_category: data.benefit_category || 1,
          benefited: response.benefited.name,
          movimentation_categories: [response.category.id || -1]
        };
        return this.waiter.benefit.updateBenefit(benefit).pipe(concatMap(
          benefit => of({
            benefit: <Benefit>benefit,
            benefited: <Benefited>response.benefited,
            category: <MovimentationCategory>response.category
          })
        ))
      }),
      concatMap(response => {
        const paymentMethod: PaymentMethod = {
          name: data.payment_method || ''
        }
        return this.waiter.paymentMethod.createPaymentMethod(paymentMethod).pipe(concatMap(
          paymentMethod => of({
            paymentMethod: <PaymentMethod>paymentMethod,
            benefit: <Benefit>response.benefit,
            benefited: <Benefited>response.benefited,
            category: <MovimentationCategory>response.category
          })
        ))
      }),
      concatMap(response => {
        const movement: Movement = {
          date_movement: moment(data.date_movement).format('YYYY-MM-DD') || '',
          movemented_value: Number(data.movemented_value),
          observation: data.observation || '',
          valid: true,
          movimentation_categories: response.category.id || 0,
          benefited: response.benefited.name,
          payment_method: response.paymentMethod.name,
          benefit: response.benefit.id || 0,
          currency: data.currency || ''
        }
        return this.waiter.movements.createMovement(movement);
      }),
      concatMap(_ => {
        const movementedValue = Number(data.movemented_value) * (data.movimentation_signal || 1);
        return this.waiter.currentAccountBalance.updateCurrentAccountBalance(movementedValue);
      })
    ).subscribe({
      complete: () => {
        this.resetValues();
        this.snackbar.okSnackBar('Movimentação criada com sucesso');
        this.movementedValueField.nativeElement.focus();
        this.progressBarVisible = false;
      },
      error: error => {
        this.snackbar.okSnackBar('Não foi possível criar a movimentação, cheque o console');
        console.error(error);
        this.progressBarVisible = false;
      }
    })
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
      currency: current_values.currency,
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
