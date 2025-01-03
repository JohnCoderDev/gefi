import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GefiApi } from '../../env/gefi-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GefiApiService {
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

  createNewMovementFromForms(data: Object): Observable<any> {
    this.createPaymentMethod(data);
    this.updateMovimentationCategory(data);
    this.updateBenefited(data);
    this.updateBenefit(data);
    this.updateCurrentAccountBalance(data);
    return this.post('Movements', data);
  }

  private createPaymentMethod(data: Object): void { }
  private updateMovimentationCategory(data: Object) { }
  private updateBenefited(data: Object): void { }
  private updateBenefit(data: Object): void { }
  private updateCurrentAccountBalance(data: Object): void { }

  private buildUrl(path: string): string {
    if (!path.endsWith('/') && !path.includes("/?")) {
      path = path + "/";
    }
    return `${GefiApi.url}/${path}`;
  }
}
