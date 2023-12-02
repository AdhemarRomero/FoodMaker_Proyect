import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardModule } from './collection-card/collection-card.module';
import { CollectionCardsModule } from './collection-cards/collection-cards.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CollectionCardModule,
    CollectionCardsModule,
  ],
  exports: [
    CollectionCardModule,
    CollectionCardsModule,
  ]
})
export class CollectionModule { }
