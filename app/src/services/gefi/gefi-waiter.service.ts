import { Injectable } from '@angular/core';
import { GefiCurrentAccountBalanceService } from './gefi-current-account-balance.service';
import { GefiMovementsService } from './gefi-movements.service';
import { GefiCurrencyService } from './gefi-currency.service';
import { GefiPaymentMethodService } from './gefi-payment-method.service';
import { GefiBenefitService } from './gefi-benefit.service';
import { GefiBenefitedService } from './gefi-benefited.service';
import { GefiMovimentationCategoryService } from './gefi-movimentation-category.service';

@Injectable({
  providedIn: 'root'
})
export class GefiWaiterService {
  constructor(
    public currentAccountBalance: GefiCurrentAccountBalanceService,
    public movements: GefiMovementsService,
    public currency: GefiCurrencyService,
    public paymentMethod: GefiPaymentMethodService,
    public benefit: GefiBenefitService,
    public benefited: GefiBenefitedService,
    public movimentationCategory: GefiMovimentationCategoryService,
  ) { }
}
