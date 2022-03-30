import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Recipes {
  id: number;
  recipeName: string;
  description: string;
  rating: number;
  image: string;
  ingredients: Ingredients[];
}

export interface Ingredients {
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipesApiService {
  private URL: string = 'http://localhost:3000/recipes';
  // recipe!: Recipes;
  // recipes: Recipes[] = [];
  // searchRecipe = new Subject<string>();
  addRecipeSub = new Subject<Recipes>();
  deleteRecipe = new Subject<Recipes>();

  constructor(private http: HttpClient) {}

  // setSearchRecipe(value: string) {
  //   this.searchRecipe.next(value);
  // }

  addRecipe(recipe: Recipes) {
    return this.http.post<Recipes>(this.URL, recipe);
  }

  getRecipe(id: number) {
    return this.http.get<Recipes>(`${this.URL}/${id}`);
  }

  getRecipes() {
    return this.http.get<Recipes[]>(this.URL);
  }

  onDeleteRecipe(id: number) {
    return this.http.delete<Recipes>(`${this.URL}/${id}`);
  }

  // get searchRecipe$() {
  //   return this.searchRecipe.asObservable();
  // }
}
