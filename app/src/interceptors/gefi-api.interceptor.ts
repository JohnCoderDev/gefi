import { HttpInterceptorFn } from '@angular/common/http';
import { GefiApi } from '../env/gefi-api';

export const gefiApiInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    headers: req.headers.set('Authorization', GefiApi.token)
  });
  return next(newReq);
};
