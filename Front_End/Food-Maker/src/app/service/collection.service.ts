import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { ICollection, ICollectionGetCollectionById, ICollectionResponse, IParamsCollectionFetchDeleteOne } from '../interface/collection.interface';
import { IAvailableRecipeBase } from '../interface/recipe.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private showCollectionsBehaviorSubject: BehaviorSubject<ICollection[]> = new BehaviorSubject([])
  $showCollections = this.showCollectionsBehaviorSubject.asObservable()

  private collectionsBehaviorSubject: BehaviorSubject<ICollection[]> = new BehaviorSubject([])
  $collections = this.collectionsBehaviorSubject.asObservable()

  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router
  ) { }

  getShowCollections() {
    return this.showCollectionsBehaviorSubject.value
  }

  setShowCollections(showCollections: ICollection[]) {
    this.showCollectionsBehaviorSubject.next(showCollections)
  }

  getCollections() {
    return this.collectionsBehaviorSubject.value
  }

  setCollections(collections: ICollection[]) {
    this.collectionsBehaviorSubject.next(collections)
  }

  removeCollection(collectionId: number) {
    const collections = this.getCollections()
    const newCollections = collections.filter(collection => collection.id != collectionId)

    this.setCollections(newCollections)
  }

  fetchCollections() {
    const collections = this.getCollections()

    if(collections.length) {
      this.setShowCollections(collections)
      return
    }

    const endpoint = "/getcoleccion"
    
    const collectionObservable = this.httpService.get<ICollectionResponse[]>(endpoint)
    collectionObservable.subscribe(response => this.handleFetchCollections(response))
  }

  private handleFetchCollections(response: ICollectionResponse[]) {
    const responseAux: ICollection[] = response.map(
      item => {
        const recipes: IAvailableRecipeBase[] = item.recetas.map(
          recipe => ({
            id: recipe.idreceta,
            name: recipe.nombre,
            description: recipe.descripcion,
            shortDescription: recipe.descripcioncorta,
            instruction: recipe.instrucciones,
            cookingTime: recipe.tiempopreparacion,
            categoryId: recipe.idcategoria,
            image: recipe.imagen,
            category: {
              id: recipe.objCategoria.idcategoria,
              name: recipe.objCategoria.nombre
            }
          })
        )

        const result: ICollection = {
          recipes,
          id: item.id,
          name: item.nomnre,
        }

        return result
      }
    )

    this.showCollectionsBehaviorSubject.next(responseAux)
    this.collectionsBehaviorSubject.next(responseAux)
  }

  getCollectionById(params: ICollectionGetCollectionById) {
    const { id } = params

    const collections = this.getCollections()

    const collection = collections?.find((collection) => collection.id == id)

    if(!collection) {
      this.router.navigate(["/favorite"])
      return null
    }

    return collection
  }

  fetchDeleteOne(params: IParamsCollectionFetchDeleteOne) {
    const endpoint = `/coleccion/eliminar/${params?.id}`

    const collectionObservable = this.httpService.delete(endpoint)
    collectionObservable.subscribe(() => this.removeCollection(params?.id))
  }
}
