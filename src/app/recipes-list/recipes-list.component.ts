import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { Recipes, RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  private searchRecipes: string = '';
  // public recipes: Recipes[] = [];
  public recipes$: Observable<any> = of([]);
  // searchRecipe$ = this.recipeApiService.searchRecipe$.pipe(
  //   map((value) => value.toLowerCase().trim()),
  //   switchMap((value: string) => this.getSearchRecipes(value))
  // );

  constructor(private recipeApiService: RecipesApiService) {}

  ngOnInit(): void {
    this.recipeApiService.searchRecipe.subscribe((value) => {
      this.searchRecipes = value;
      this.getSearchRecipes();
    });

    this.recipes$ = this.recipeApiService.getRecipes();

    // this.recipeApiService.getRecipes().subscribe((result) => {
    //   this.recipes = result;
    // });

    // this.recipeApiService.addRecipeSub.subscribe((recipe) => {
    //   this.recipes.push(recipe);
    // });
  }

  // private getSearchRecipes(value: string): Observable<void> {
  //   this.recipe$ = this.recipeApiService
  //     .getRecipes()
  //     .pipe(
  //       map((recipes) =>
  //         recipes.filter((recipe) =>
  //           recipe.recipeName.toLowerCase().includes(value)
  //         )
  //       )
  //     );
  //   return this.recipe$;
  // }

  private getSearchRecipes() {
    this.recipes$ = this.recipeApiService
      .getRecipes()
      .pipe(
        map((recipes) =>
          recipes.filter((recipe) =>
            recipe.recipeName
              .toLowerCase()
              .includes(this.searchRecipes.toLowerCase().trim())
          )
        )
      );
  }

  onFilterRecipe(recipe: Recipes) {
    this.recipes$ = this.recipes$.pipe(
      filter((r) => {
        return r.id !== recipe.id;
      })
    );
  }
}
