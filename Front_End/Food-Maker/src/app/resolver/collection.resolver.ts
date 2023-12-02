import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CollectionService } from '../service/collection.service';

export const fetchCollectionsResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  return inject(CollectionService).fetchCollections();
};
