import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { IUser } from '../interface/user.interface';

export const fetchCurrentUserResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  return inject(UserService).fetchCurrentUser()
};
