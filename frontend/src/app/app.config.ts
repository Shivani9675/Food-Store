import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor, authInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-bottom-center', newestOnTop: false, closeButton: true, toastClass: 'custom-toast-class', maxOpened: 1, autoDismiss: true, preventDuplicates: true }))
  ]
};
