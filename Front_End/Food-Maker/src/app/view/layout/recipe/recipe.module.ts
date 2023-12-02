import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ RecipeComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [ RecipeComponent ],
})
export class RecipeModule { }
