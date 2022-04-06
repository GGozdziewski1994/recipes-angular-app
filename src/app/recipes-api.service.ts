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
  addRecipeSub = new Subject<Recipes>();
  deleteRecipe = new Subject<Recipes>();
  recipeDetail = new Subject<Recipes>();

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipes) {
    return this.http.post<Recipes>(this.URL, recipe);
  }

  getRecipe(id: number) {
    return this.http.get<Recipes>(`${this.URL}/${id}`);
  }

  getRecipes(authorId: number | null) {
    if (authorId) {
      return this.http.get<Recipes[]>(`${this.URL}?authorId_like=${authorId}`);
    } else {
      return this.http.get<Recipes[]>(this.URL);
    }
  }

  getReciesSort(name: string, value: string, authorId: number | null) {
    if (authorId) {
      return this.http.get<Recipes[]>(
        `${this.URL}?_sort=${name}&_order=${value}&authorId_like=${authorId}`
      );
    } else {
      return this.http.get<Recipes[]>(
        `${this.URL}?_sort=${name}&_order=${value}`
      );
    }
  }

  getRecipesFilter(search: string, authorId: number | null) {
    if (authorId) {
      return this.http.get<Recipes[]>(
        `${this.URL}?recipeName_like=${search}&authorId_like=${authorId}`
      );
    } else {
      return this.http.get<Recipes[]>(`${this.URL}?recipeName_like=${search}`);
    }
  }

  onDeleteRecipe(id: number) {
    return this.http.delete<Recipes>(`${this.URL}/${id}`);
  }
}
