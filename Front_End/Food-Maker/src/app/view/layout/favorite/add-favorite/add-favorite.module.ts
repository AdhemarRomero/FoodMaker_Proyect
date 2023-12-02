import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFavoriteComponent } from './add-favorite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddFavoriteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddFavoriteComponent],
})
export class AddFavoriteModule { }
