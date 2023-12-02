import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardsComponent } from './category-cards.component';
import { CategoryCardModule } from '../category-card/category-card.module';



@NgModule({
  declarations: [CategoryCardsComponent],
  imports: [
    CommonModule,
    CategoryCardModule
  ],
  exports: [CategoryCardsComponent],
})
export class CategoryCardsModule { }
