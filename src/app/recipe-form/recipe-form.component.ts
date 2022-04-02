import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipesApiService } from '../recipes-api.service';

interface Rating {
  five: string;
  foure: string;
  three: string;
  two: string;
  one: string;
}

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  ratingForm!: FormGroup;
  isRating: boolean = false;
  rating: number | null = null;
  error: string | null = null;

  constructor(private recipeApiService: RecipesApiService) {}

  ngOnInit() {
    this.initForm();
    this.ratingInitForm();
  }

  onSubmit() {
    this.recipeApiService
      .addRecipe({ ...this.recipeForm.value, rating: this.rating })
      .subscribe(
        (res) => {
          this.recipeApiService.addRecipeSub.next(res);
        },
        (error) => {
          this.error = error.message;
        }
      );
    this.recipeForm.reset();
    this.rating = null;
  }

  onIsRating() {
    this.isRating = true;
    this.rating = null;
  }

  onCloseRating() {
    this.isRating = false;
  }

  getRating() {
    for (let value of Object.values<Rating>(this.ratingForm.value)) {
      if (value !== null) {
        this.rating = +value;
      }
    }
    this.onCloseRating();
  }

  onHandlingError() {
    this.error = null;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null),
        quantity: new FormControl(null),
      })
    );
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get ingredientsFormArray() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(null),
      description: new FormControl(null),
      image: new FormControl(null),
      rating: new FormControl(null),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl(null),
          quantity: new FormControl(null),
        }),
      ]),
    });
  }

  private ratingInitForm() {
    this.ratingForm = new FormGroup({
      five: new FormControl(null),
      four: new FormControl(null),
      three: new FormControl(null),
      two: new FormControl(null),
      one: new FormControl(null),
    });
  }
}
