import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipes, RecipesApiService } from 'src/app/recipes-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  recipe!: Recipes;
  id!: number;
  error: string | null = null;
  isAuthor!: boolean;

  constructor(
    private recipesApiService: RecipesApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isAuthor = user?.role === 'author' ? true : false;
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipesApiService.getRecipe(this.id).subscribe(
        (recipe) => {
          this.recipe = recipe;
        },
        (error) => {
          this.error = error.message;
        }
      );
    });
  }

  onDeleteRecipe() {
    this.recipesApiService.onDeleteRecipe(this.id).subscribe(
      () => {
        this.recipesApiService.deleteRecipe.next(this.recipe);
      },
      (error) => {
        this.error = error.message;
      }
    );
    this.router.navigate(['recipes']);
  }

  onHandlingError() {
    this.error = null;
  }
}
