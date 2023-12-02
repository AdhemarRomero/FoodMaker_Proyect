import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddIngredientComponent } from './add-ingredient.component';



@NgModule({
  declarations: [AddIngredientComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
  ]
})
export class AddIngredientModule { }
