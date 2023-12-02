import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interface/category.interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.css']
})
export class CategoryCardsComponent implements OnInit {

  categories: ICategory[] = []

  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.takeCategories()
  }

  takeCategories() {
    this.categoryService.$categories.subscribe(
      (categories) => this.categories = categories
    )
  }
}
