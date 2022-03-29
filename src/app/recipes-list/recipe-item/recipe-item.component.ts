import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipes, RecipesApiService } from 'src/app/recipes-api.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipes;
  @Output() emitRecipe = new EventEmitter<Recipes>();

  constructor(private recipeApiService: RecipesApiService) {}

  ngOnInit(): void {}

  onDeleteRecipe() {
    this.recipeApiService.deleteRecipe(this.recipe.id).subscribe((res) => {
      this.emitRecipe.emit(this.recipe);
    });
  }
}
