import { Component, OnInit } from '@angular/core';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  recipeDitailId!: number | null;

  constructor(private recipesApiService: RecipesApiService) {}

  ngOnInit(): void {
    this.recipesApiService.recipeDetail.subscribe((recipe) => {
      if (recipe) {
        this.recipeDitailId = recipe.id;
      }
    });
  }
}
