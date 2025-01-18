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

  get(queryparams?: string | null, id?: string | null, basePath?: string | null): Observable<any> {
    const path = this.buildPath(id, queryparams, basePath);
    return this.gefiAPIService.get(path);
  }
  post(data: Object, basePath?: string | null): Observable<any> {
    return this.gefiAPIService.post(basePath ?? this.basePath, data);
  }
  patch(id: any, data: Object, basePath?: string | null): Observable<any> {
    const path = this.buildPath(id, null, basePath);
    return this.gefiAPIService.patch(path, data);
  }
  update(id: any, data: Object, basePath?: string | null): Observable<any> {
    const path = this.buildPath(id, null, basePath);
    return this.gefiAPIService.update(path, data);
  }
  delete(id: any, basePath?: string | null): Observable<any> {
    const path = this.buildPath(id, null, basePath);
    return this.gefiAPIService.delete(path);
  }

  private buildPath(id?: any, queryparams?: string | null, basePath?: string | null): string {
    const basePathUsed = basePath ?? this.basePath;
    if (!basePathUsed) return '';
    return basePathUsed + (id ? `/${id}` : '') + (queryparams ? `/?${queryparams}` : '');
  }
}
