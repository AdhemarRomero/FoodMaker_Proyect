import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardModule } from '../recipe-card/recipe-card.module';
import { RecipeCardsComponent } from './recipe-cards.component';



@NgModule({
  declarations: [ RecipeCardsComponent ],
  imports: [
    CommonModule,
    RecipeCardModule
  ],
  exports: [ RecipeCardsComponent ],
})
export class RecipeCardsModule { }
