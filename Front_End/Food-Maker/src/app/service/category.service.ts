import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { ICategory, ICategoryResponse } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesBehaviorSubject: BehaviorSubject<ICategory[]> = new BehaviorSubject([])
  $categories = this.categoriesBehaviorSubject.asObservable()

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCategory() {
    return this.categoriesBehaviorSubject.value
  }

  setCategory(categories: ICategory[]) {
    this.categoriesBehaviorSubject.next(categories)
  }

  fetchCategories() {
    const categories = this.getCategory()

    if(categories.length) return

    const endpoint = "/categorias"
    const categoriesObservable = this.httpService.get<ICategoryResponse[]>(endpoint)
    
    categoriesObservable.subscribe(
      response => this.handleFetchCategories(response)
    )
  }

  private handleFetchCategories(response: ICategoryResponse[]) {
    const responseAux: ICategory[] = response.map(
      item => ({
        id: item.idcategoria,
        name: item.nombre,
      })
    )

    this.categoriesBehaviorSubject.next(responseAux)
  }
}
