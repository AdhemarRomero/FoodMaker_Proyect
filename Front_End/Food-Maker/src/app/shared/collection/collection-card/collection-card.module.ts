import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardComponent } from './collection-card.component';



@NgModule({
  declarations: [CollectionCardComponent],
  imports: [
    CommonModule
  ],
  exports: [CollectionCardComponent],
})
export class CollectionCardModule { }
