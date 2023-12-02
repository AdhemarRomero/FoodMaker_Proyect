import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAvailableRecipes } from 'src/app/interface/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input()
  showAvailableRecipe: IAvailableRecipes

  image: string
  name: string
  cookingTime: string
  ingredients: number

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.image = this.showAvailableRecipe.image 
      ? `data:image/png;base64,${this.showAvailableRecipe.image}`
      : "/assets/recipe-card/recipe-card-loader.gif"
    
    this.name = this.showAvailableRecipe.name
    this.cookingTime = `${this.showAvailableRecipe.cookingTime}min`
    this.ingredients = this.showAvailableRecipe.ingredients.length
  }

  handleRedirectRecipe() {
    this.router.navigate(["/recipe", this.showAvailableRecipe.id])
  }
}
