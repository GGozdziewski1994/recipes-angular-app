import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesApiService } from 'src/app/recipes-api.service';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.css'],
})
export class RecipeImageComponent implements OnInit {
  recipeImage: string = '';
  id!: number;

  constructor(
    private recipeApiService: RecipesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeApiService.getRecipe(this.id).subscribe((result) => {
        this.recipeImage = result.image;
      });
    });
  }

  onClose() {
    this.recipeImage = '';
    this.router.navigate(['/recipes']);
  }
}
