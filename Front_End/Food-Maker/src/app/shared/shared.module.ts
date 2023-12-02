import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { CategoryModule } from './category/category.module';
import { CollectionModule } from './collection/collection.module';
import { RecipeModule } from './recipe/recipe.module';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    RecipeModule,
    DialogModule,
    CategoryModule,
    CollectionModule,
  ],
  exports: [ 
    NavbarModule,
    RecipeModule,
    DialogModule,
    CategoryModule,
    CollectionModule,
  ]
})
export class SharedModule { }
