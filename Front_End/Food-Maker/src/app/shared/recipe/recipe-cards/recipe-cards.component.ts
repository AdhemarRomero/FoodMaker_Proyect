import { Component, OnInit } from '@angular/core';
import { IAvailableRecipes } from 'src/app/interface/recipe.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {
  
  showAvailableRecipes: IAvailableRecipes[] = []

  constructor(
    private readonly recipeService: RecipeService
  ) { }
  
  ngOnInit(): void {
    this.takeAvailabeRecipes()
  }

  takeAvailabeRecipes() {
    this.recipeService.$showAvailableRecipes.subscribe(
      (showAvailableRecipes) => this.showAvailableRecipes = showAvailableRecipes
    )
  }
}
