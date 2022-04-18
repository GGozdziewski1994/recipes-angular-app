import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  recipeDitailId!: number | null;
  isAuthor: string = '';

  constructor(
    private recipesApiService: RecipesApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recipesApiService.recipeDetail.subscribe((recipe) => {
      if (recipe) {
        this.recipeDitailId = recipe.id;
      }
    });

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isAuthor = user.role;
      }
    });
  }
}
