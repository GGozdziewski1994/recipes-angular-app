import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private recipeApiService: RecipesApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSearchRecipe(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.recipeApiService.setSearchRecipe(value);
  }

  addRecipe() {
    this.router.navigate(['form-add-recipe']);
  }
}
