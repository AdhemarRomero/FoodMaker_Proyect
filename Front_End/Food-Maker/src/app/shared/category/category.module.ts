import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardModule } from './category-card/category-card.module';
import { CategoryCardsModule } from './category-cards/category-cards.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoryCardModule,
    CategoryCardsModule,
  ],
  exports: [
    CategoryCardModule,
    CategoryCardsModule,
  ]
})
export class CategoryModule { }
