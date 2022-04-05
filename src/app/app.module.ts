import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { HeaderComponent } from './header/header.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeImageComponent } from './recipes-list/recipe-image/recipe-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './recipes-list/details/details.component';
import { StarsPipe } from './shared/stars.pipe';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';

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
    ErrorHandlingComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
