import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from '../service/category.service';

export const fetchCategoriesResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  return inject(CategoryService).fetchCategories();
};
