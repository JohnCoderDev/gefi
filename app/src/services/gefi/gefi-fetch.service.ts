import { Injectable } from '@angular/core';
import { GefiRequest } from './gefi-request';
import { Observable } from 'rxjs';
import { GefiApiService } from './gefi-api.service';

@Injectable({
  providedIn: 'root'
})
export class GefiFetchService implements GefiRequest {
  basePath!: string;
  constructor(private gefiAPIService: GefiApiService) { }

  get(queryparams?: string | null): Observable<any> {
    const path = this.buildPath(null, queryparams);
    return this.gefiAPIService.get(path);
  }
  post(data: Object): Observable<any> {
    return this.gefiAPIService.post(this.basePath, data);
  }
  patch(id: any, data: Object): Observable<any> {
    const path = this.buildPath(id, null);
    return this.gefiAPIService.patch(path, data);
  }
  update(id: any, data: Object): Observable<any> {
    const path = this.buildPath(id, null);
    return this.gefiAPIService.update(path, data);
  }
  delete(id: any): Observable<any> {
    const path = this.buildPath(id, null);
    return this.gefiAPIService.delete(path);
  }

  private buildPath(id?: any, queryparams?: string | null): string {
    if (!this.basePath) return '';
    return this.basePath + (id ? `/${id}` : '') + (queryparams ? `/?${queryparams}` : '');
  }
}
