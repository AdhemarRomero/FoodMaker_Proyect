import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  user: IUser = {} as IUser

  constructor(
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.takeUser()
    this.getAvailableRecipesByCategory()
  }

  takeUser() {
    this.userService.user$.subscribe(
      (user) => this.user = user
    )
  }

  getAvailableRecipesByCategory() {
    this.recipeService.getAvailableRecipesByCategory()
  }
}
