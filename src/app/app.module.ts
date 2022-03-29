import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeImageComponent } from './recipes-list/recipe-image/recipe-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './recipes-list/details/details.component';
import { StarsPipe } from './stars.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: MainComponent,
    children: [
      { path: 'form', component: RecipeFormComponent },
      { path: 'details', component: DetailsComponent },
      { path: ':id', component: RecipeImageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeItemComponent,
    HeaderComponent,
    RecipeFormComponent,
    RecipeImageComponent,
    MainComponent,
    DetailsComponent,
    StarsPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
