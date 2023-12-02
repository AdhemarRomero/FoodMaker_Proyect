import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardModule } from './recipe-card/recipe-card.module';
import { RecipeCardsModule } from './recipe-cards/recipe-cards.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecipeCardModule,
    RecipeCardsModule,
  ],
  exports: [
    RecipeCardModule,
    RecipeCardsModule,
  ]
})
export class RecipeModule { }
