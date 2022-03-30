import { Component, OnInit } from '@angular/core';
import { debounceTime, delay, filter, map, Observable, of } from 'rxjs';
import { Recipes, RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  // public recipes$: Observable<any> = of([]);
  public recipes: Recipes[] = [];

  constructor(private recipeApiService: RecipesApiService) {}

  ngOnInit(): void {
    // this.recipes$ = this.recipeApiService.getRecipes();
    this.recipeApiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });

    this.recipeApiService.deleteRecipe.subscribe((value) => {
      this.onFilterRecipe(value);
    });

    this.recipeApiService.addRecipeSub.subscribe((recipe) => {
      this.recipes.push(recipe);
    });
  }

  onSearchRecipe(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.getSearchRecipes(value);
  }

  private getSearchRecipes(value: string) {
    this.recipeApiService
      .getRecipes()
      .pipe(
        delay(300),
        map((recipes) =>
          recipes.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(value.toLowerCase().trim())
          )
        )
      )
      .subscribe((recipes) => (this.recipes = recipes));
  }

  private onFilterRecipe(recipe: Recipes) {
    this.recipes = this.recipes.filter((r) => {
      return r.id !== recipe.id;
    });
  }
}
