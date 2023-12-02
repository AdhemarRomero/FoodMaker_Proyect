import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICollection, IParamsCollectionFetchDeleteOne } from 'src/app/interface/collection.interface';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent {
  @Input()
  collection: ICollection = {} as ICollection

  constructor(
    private readonly router: Router,
    private readonly collectionService: CollectionService,
  ) { }

  handleClickCollection() {
    const recipes = this.collection.recipes

    if(!recipes.length) return

    this.router.navigate(["/favorite", this.collection.id])
  }

  handleDelete() {
    const collection = this.collection

    const { id } = collection

    const params: IParamsCollectionFetchDeleteOne = { id }

    this.collectionService.fetchDeleteOne(params)
  }
}