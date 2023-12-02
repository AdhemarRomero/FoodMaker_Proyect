import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAddIngredientData } from './interfaces/add-ingredient.interface';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  ingredient: IAddIngredientData

  constructor(
    private readonly dialogRef: MatDialogRef<AddIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IAddIngredientData,
  ) { }

  ngOnInit(): void {
    this.ingredient = this.data
  }

  handleClose() {
    this.data = this.ingredient
    this.dialogRef.close()
  }
}
