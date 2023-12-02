import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const user = sessionStorage.getItem("user")
  
  if(!user) {
    sessionStorage.removeItem("jwt")

    const router = new Router()
    return router.navigate(["/login"])
  }

  const jwt = sessionStorage.getItem("jwt")

  if(!jwt) {
    const router = new Router()
    return router.navigate(["/login"])
  }

  return true;
};
