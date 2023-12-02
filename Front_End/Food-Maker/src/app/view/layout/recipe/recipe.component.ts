import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAvailableRecipeIngredient, IAvailableRecipes, IParamFetchAddRecipeBody } from 'src/app/interface/recipe.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { AddIngredientComponent } from 'src/app/shared/dialog/ingredient/add-ingredient/add-ingredient.component';
import { IAddIngredientData } from 'src/app/shared/dialog/ingredient/add-ingredient/interfaces/add-ingredient.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  formRecipe: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    cookingTimeHours: new FormControl(null, [Validators.required]),
    cookingTimeMinutes: new FormControl(null, [Validators.required]),
    cookingTimeSeconds: new FormControl(null, [Validators.required]),
  })

  ingredients: IAddIngredientData[] = []

  availableRecipe: IAvailableRecipes = {} as IAvailableRecipes

  constructor(
    private readonly matDialog: MatDialog,
    private readonly recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.formRecipe.reset()
    this.takeRecipe()
  }

  takeRecipe() {
    this.recipeService.$availableRecipe.subscribe(
      (availableRecipe) => this.handleTakeRecipe(availableRecipe)
    )
  }

  handleTakeRecipe(availableRecipe: IAvailableRecipes) {    
    const isEmpty = Object.values(availableRecipe)

    if(!isEmpty.length) return

    const cookingTimeHours = Math.floor((availableRecipe?.cookingTime ?? 0) / 60)
    const cookingTimeMinute = ((availableRecipe?.cookingTime ?? 0) - (cookingTimeHours * 60)) / 60
    const cookingTimeSeconds = (availableRecipe?.cookingTime ?? 0) % 60

    this.formRecipe.controls["title"].setValue(availableRecipe?.name)
    this.formRecipe.controls["description"].setValue(availableRecipe?.description)
    this.formRecipe.controls["instructions"].setValue(availableRecipe?.instruction)
    this.formRecipe.controls["cookingTimeHours"].setValue(+cookingTimeHours)
    this.formRecipe.controls["cookingTimeMinutes"].setValue(+cookingTimeMinute)
    this.formRecipe.controls["cookingTimeSeconds"].setValue(+cookingTimeSeconds)

    this.ingredients = availableRecipe?.ingredients ?? []
  }

  handleSubmit() {
    const ingredients = this.ingredients
    
    if(!ingredients.length) {
      alert("Pon ingredientes")
      return
    }

    const ingredientsAux = ingredients.map(
      (ingredient) => ingredient as IAvailableRecipeIngredient
    )
    
    const formRecipeData = this.formRecipe.value

    const cookingTime = formRecipeData?.cookingTimeHours * 60 
      + formRecipeData?.cookingTimeMinutes
      + formRecipeData?.cookingTimeSeconds / 60 

    const body: IAvailableRecipes = {
      cookingTime,
      name: formRecipeData?.title,
      description: formRecipeData?.description,
      shortDescription: formRecipeData?.title,
      instruction: formRecipeData?.instructions,
      categoryId: 1,
      image: "",
      category: {
        id: 1,
        name: "Mis recetas"
      },
      ingredients: ingredientsAux,
    } as IAvailableRecipes

    const params: IParamFetchAddRecipeBody = {
      recipes: body
    }

    this.recipeService.fetchAddRecipe(params)
  }

  handleAddIngredient() {
    const ingredient: IAddIngredientData = {} as IAddIngredientData

    const addIngredientDialog = this.matDialog.open(AddIngredientComponent, { data: ingredient })
    addIngredientDialog.afterClosed().subscribe(
      (ingredient) => this.ingredients.push(ingredient)
    )
  }

  get formRecipeData() {
    return this.formRecipe.controls
  }
}
