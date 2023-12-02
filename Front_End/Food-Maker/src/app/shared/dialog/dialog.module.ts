import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientModule } from './ingredient/ingredient.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IngredientModule,
  ],
  exports: [
    IngredientModule,
  ]
})
export class DialogModule { }
