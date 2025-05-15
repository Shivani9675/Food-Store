import { HttpInterceptorFn, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { tap } from 'rxjs';

let pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  pendingRequests++;

  const handleHideLoading = () => {
    pendingRequests--;
    if (pendingRequests === 0) {
      loadingService.hideLoading();
    }
  };
  
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          handleHideLoading();
        }
      },
      error: () => {
        handleHideLoading();
      }
    })
  );
}
