import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/interface/category.interface';
import { IParamFetchAvailableRecipesByCategory } from 'src/app/interface/recipe.interface';
import { CategoryService } from 'src/app/service/category.service';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input()
  category: ICategory

  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  handleClick() {
    const categoryId = this.category.id

    const params: IParamFetchAvailableRecipesByCategory = { categoryId }

    this.recipeService.fetchAvailableRecipesByCategory(params)
  }
}
