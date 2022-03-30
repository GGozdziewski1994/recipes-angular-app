import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private recipeApiService: RecipesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.recipeApiService.addRecipe(this.recipeForm.value).subscribe((res) => {
      this.recipeApiService.addRecipeSub.next(res);
    });
    this.recipeForm.reset();
  }

  // onCancel() {
  //   this.router.navigate(['/recipes'], { relativeTo: this.route });
  // }

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
}
