import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipes, RecipesApiService } from 'src/app/recipes-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  recipe!: Recipes;
  id!: number;

  constructor(
    private recipesApiService: RecipesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipesApiService.getRecipe(this.id).subscribe((recipe) => {
        this.recipe = recipe;
      });
    });
  }

  onDeleteRecipe() {
    this.recipesApiService.onDeleteRecipe(this.id).subscribe((res) => {
      this.recipesApiService.deleteRecipe.next(this.recipe);
    });
    this.router.navigate(['recipes']);
  }
}
