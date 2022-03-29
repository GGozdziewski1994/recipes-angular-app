import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipes, RecipesApiService } from 'src/app/recipes-api.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipes;

  constructor() {}

  ngOnInit(): void {}
}
