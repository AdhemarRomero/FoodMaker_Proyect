import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardsComponent } from './collection-cards.component';
import { CollectionCardModule } from '../collection-card/collection-card.module';



@NgModule({
  declarations: [CollectionCardsComponent],
  imports: [
    CommonModule,
    CollectionCardModule
  ],
  exports: [CollectionCardsComponent],
})
export class CollectionCardsModule { }
