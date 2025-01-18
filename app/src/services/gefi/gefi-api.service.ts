import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GefiApi } from '../../env/gefi-api';
import { concat, Observable, tap } from 'rxjs';
import moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class GefiApiService {
  gefiAPI: GefiApi = new GefiApi();
  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(this.buildUrl(path), { observe: 'response' });
  }

  post(path: string, data: Object): Observable<any> {
    return this.http.post(this.buildUrl(path), data, { observe: 'response' });
  }

  update(path: string, data: Object): Observable<any> {
    return this.http.put(this.buildUrl(path), data, { observe: 'response' });
  }

  patch(path: string, data: Object): Observable<any> {
    return this.http.patch(this.buildUrl(path), data, { observe: 'response' });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(this.buildUrl(path), { observe: 'response' });
  }

  createNewMovementFromForms(data: any): Observable<any> {
    return concat(
      this.createPaymentMethod(data),
      this.updateMovimentationCategory(data),
      this.updateBenefited(data),
      this.updateBenefit(data),
      this.updateCurrentAccountBalance(data),
      this.createNewMovement(data),
    );
  }

  private createPaymentMethod(data: any): Observable<any> {
    return this.get(`PaymentMethod/?name=${data.payment_method}`).pipe(tap(
      response => {
        if (response.body.length === 0) {
          const payment_method_data = { name: data.payment_method }
          this.post('PaymentMethod', payment_method_data).subscribe();
        }
      }
    ))
  }

  private updateMovimentationCategory(data: any): Observable<any> {
    return this.getMovimentationCategory(data).pipe(
      tap(response => {
        if (response.body.length === 0) {
          const movimentation_category_data = {
            name: data.movimentation_categories,
            signal: data.movimentation_signal,
            active: true
          };
          this.post('MovimentationCategory', movimentation_category_data).subscribe();
        } else if (!response.body[0].active) {
          this.patch(`MovimentationCategory/${response.body[0].id}`, { active: true }).subscribe();
        }
      })
    )
  }

  private updateBenefited(data: any): Observable<any> {
    return this.get(`Benefited/?name=${data.benefited}`).pipe(tap(response => {
      const benefited_category = data.movimentation_signal === -1 ? 2 : 1;

      this.getMovimentationCategory(data).subscribe(
        movimentation_category_response => {
          if (response.body.length === 0) {
            const benefited_data = {
              name: data.benefited,
              benefited_type: data.benefited_type,
              benefited_category: benefited_category,
              movimentation_categories: [movimentation_category_response.body[0].id]
            };
            this.post('Benefited', benefited_data).subscribe();
          } else {
            const current_benefited_data = response.body[0];
            const benefited_movimentation_categories = [...current_benefited_data.movimentation_categories];
            benefited_movimentation_categories.push(movimentation_category_response.body[0].id);

            const benefited_data = {
              benefited_category: benefited_category !== current_benefited_data.category ? 3 : benefited_category,
              movimentation_categories: benefited_movimentation_categories
            };
            this.patch(`Benefited/${current_benefited_data.name}`, benefited_data).subscribe();
          }
        }
      )
    }))
  }

  private updateBenefit(data: any): Observable<any> {
    return this.getBenefit(data).pipe(tap(
      response => {
        this.getMovimentationCategory(data).subscribe(
          movimentation_category_response => {
            if (response.body.length === 0) {
              const benefit_data = {
                name: data.benefit,
                benefited: data.benefited,
                benefit_category: data.benefit_category,
                movimentation_categories: [movimentation_category_response.body[0].id],
              }
              this.post(`Benefit`, benefit_data).subscribe();
            } else {
              const current_benefit_data = response.body[0];
              const benefit_movimentation_categories = [...current_benefit_data.movimentation_categories];
              benefit_movimentation_categories.push(movimentation_category_response.body[0].id)

              const benefit_data = {
                movimentation_categories: benefit_movimentation_categories,
              }
              this.patch(`Benefit/${current_benefit_data.id}`, benefit_data).subscribe();
            }
          }
        )
      }
    ))
  }

  private updateCurrentAccountBalance(data: any): Observable<any> {
    return this.get(`CurrentAccountBalanceUpdate`).pipe(tap(
      response => {
        if (response.body.length === 0) return;
        const current_account_balance = response.body[0];
        const updated_account_balance = {
          current_value: current_account_balance.current_value + Number(data.movemented_value) * data.movimentation_signal
        }
        this.patch(`CurrentAccountBalanceUpdate/${current_account_balance.id}`, updated_account_balance).subscribe();
      }
    ))
  }

  private createNewMovement(data: any): Observable<any> {
    return this.getMovimentationCategory(data).pipe(tap(
      movimentation_category_response => {
        this.getBenefit(data).subscribe(
          benefit_response => {
            const new_movement_data = {
              date_movement: moment(data.date_movement).format('YYYY-MM-DD'),
              movemented_value: Number(data.movemented_value),
              observation: data.observation,
              movimentation_categories: movimentation_category_response.body[0].id,
              benefited: data.benefited,
              payment_method: data.payment_method,
              benefit: benefit_response.body[0].id,
              currency: data.currency,
              valid: true,
            }
            this.post('MovementsUpdate', new_movement_data).subscribe();
          }
        )
      }
    ))
  }

  private getMovimentationCategory(data: any) {
    return this.get(`MovimentationCategory/?name=${data.movimentation_categories}&signal=${data.movimentation_signal}`);
  }

  private getBenefit(data: any) {
    return this.get(`Benefit/?name=${data.benefit}&benefited__name=${data.benefited}&benefit_category=${data.benefit_category}`);
  }

  private buildUrl(path: string): string {
    if (!path.endsWith('/') && !path.includes("/?")) {
      path = path + "/";
    }
    return `${this.gefiAPI.url}/${path}`;
  }
}
