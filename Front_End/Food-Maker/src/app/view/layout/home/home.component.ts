import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: IUser = {} as IUser

  constructor(
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.takeUser()
    this.getAvailableRecipes()
  }

  takeUser() {
    this.userService.user$.subscribe(
      (user) => this.user = user
    )
  }

  getAvailableRecipes() {
    this.recipeService.getAvailableRecipes()
  }
}
