import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeImageComponent } from './recipes-list/recipe-image/recipe-image.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './recipes-list/details/details.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './shared/role.enum';
import { RoleGuard } from './shared/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form',
        component: RecipeFormComponent,
        canActivate: [RoleGuard],
        data: { roles: [Role.Author] },
      },
      { path: 'details/:id', redirectTo: 'details/:id', pathMatch: 'full' },
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
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
