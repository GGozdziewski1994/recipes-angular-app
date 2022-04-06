import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipes, RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  public recipes: Recipes[] = [];
  sortControl = new FormControl(null);
  error: string | null = null;
  sortOptions = [
    { value: 'recipeName,asc', label: 'Sort A-Z' },
    { value: 'recipeName,desc', label: 'Sort Z-A' },
    { value: 'rating,desc', label: 'Sort descending' },
    { value: 'rating,asc', label: 'Sort ascending' },
  ];
  authorId!: number | null;

  constructor(
    private recipeApiService: RecipesApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user?.role === 'author') {
        this.authorId = user.id;
      }
    });

    this.recipeApiService.getRecipes(this.authorId).subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.recipeApiService.recipeDetail.next(recipes[0]);
      },
      (error) => (this.error = error.message)
    );

    this.recipeApiService.deleteRecipe.subscribe((value) => {
      this.onFilterRecipe(value);
    });

    this.recipeApiService.addRecipeSub.subscribe((recipe) => {
      this.recipes.push(recipe);
    });

    this.sortControl.valueChanges
      .pipe(map((value: string) => value.split(',')))
      .subscribe(([sortName, sortValue]) => {
        this.getSortRecipes(sortName, sortValue);
      });
  }

  onSearchRecipe(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.getSearchRecipes(value);
  }

  onHandlingError() {
    this.error = null;
  }

  private getSearchRecipes(value: string) {
    const searchValue = value.toLowerCase().trim();
    this.recipeApiService.getRecipesFilter(searchValue).subscribe(
      (recipes) => {
        this.recipes = recipes;
      },
      (error) => (this.error = error.message)
    );
  }

  private getSortRecipes(sortName: string, sortValue: string) {
    this.recipeApiService.getReciesSort(sortName, sortValue).subscribe(
      (recipes) => {
        this.recipes = recipes;
      },
      (error) => (this.error = error.message)
    );
  }

  private onFilterRecipe(recipe: Recipes) {
    this.recipes = this.recipes.filter((r) => {
      return r.id !== recipe.id;
    });
  }
}
