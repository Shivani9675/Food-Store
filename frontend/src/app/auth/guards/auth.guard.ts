import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.currentUser;

  if (user && user.token) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  return false;
};
