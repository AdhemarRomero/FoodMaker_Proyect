import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteDetailComponent } from './favorite-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FavoriteDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [FavoriteDetailComponent]
})
export class FavoriteDetailModule { }
