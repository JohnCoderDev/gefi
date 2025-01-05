import { Observable } from "rxjs";

export interface GefiRequest {
    basePath: string;
    get(queryparams?: string | null): Observable<Response>;
    post(data: Object): Observable<Response>;
    patch(id: any, data: Object): Observable<Response>;
    update(id: any, data: Object): Observable<Response>;
    delete(id: any): Observable<Response>;
}
