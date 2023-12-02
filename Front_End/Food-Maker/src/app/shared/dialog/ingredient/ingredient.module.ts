import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIngredientModule } from './add-ingredient/add-ingredient.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddIngredientModule,
  ],
  exports: [
    AddIngredientModule
  ]
})
export class IngredientModule { }
