import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { StarsPipe } from './shared/stars.pipe';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: RecipeFormComponent },
      { path: 'details', redirectTo: 'details/0', pathMatch: 'full' },
      {
        path: 'details/:id',
        component: DetailsComponent,
        children: [{ path: 'image/:id', component: RecipeImageComponent }],
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
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
    ErrorHandlingComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
