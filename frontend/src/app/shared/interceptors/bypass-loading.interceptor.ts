import { HttpContext, HttpContextToken } from '@angular/common/http';

export const BYPASS_LOADING = new HttpContextToken<boolean>(() => false);

export function bypassLoadingInterceptor(): HttpContext {
  return new HttpContext().set(BYPASS_LOADING, true);
}
