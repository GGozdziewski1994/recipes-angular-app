import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Recipes, RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  public recipes$: Observable<any> = of([]);

  constructor(private recipeApiService: RecipesApiService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeApiService.getRecipes();

    this.recipeApiService.deleteRecipe.subscribe((value) => {
      this.onFilterRecipe(value);
    });
  }

  onSearchRecipe(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.getSearchRecipes(value);
  }

  private getSearchRecipes(value: string) {
    this.recipes$ = this.recipeApiService
      .getRecipes()
      .pipe(
        map((recipes) =>
          recipes.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(value.toLowerCase().trim())
          )
        )
      );
  }

  private onFilterRecipe(recipe: Recipes) {
    this.recipes$ = this.recipes$.pipe(
      filter((r) => {
        return r.id !== recipe.id;
      })
    );
  }
}
