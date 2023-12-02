import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  constructor(
    private readonly router: Router
  ) { }

  handleRedirect() {
    this.router.navigate(["/favorite/new"])
  }
}
