import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICollection, ICollectionGetCollectionById } from 'src/app/interface/collection.interface';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.css']
})
export class FavoriteDetailComponent implements OnInit {

  collection: ICollection = {} as ICollection

  constructor(
    private readonly router: Router,
    private readonly collectionService: CollectionService,
  ) { }

  ngOnInit(): void {
    this.takeCollection()
  }

  takeCollection() {
    const url = this.router.url
    const urlReverse = url.split("/").reverse()
    const [collectionId] = urlReverse 

    const params: ICollectionGetCollectionById = { id: +collectionId }
    this.collection = this.collectionService.getCollectionById(params)

    this.takeRecipes()
  }

  takeRecipes() {
    const collection = this.collection

    const recipes = collection?.recipes.map(
      (recipe) => ({
        id: recipe.id,
        name: recipe.name,
        recipes: [],
      })
    )

    this.collectionService.setShowCollections(recipes)
  }

  handleClickBackButton() {
    this.router.navigate(["/favorite"])
  }
}
