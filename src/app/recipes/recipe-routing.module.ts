import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { recipeResolverService } from './resipe-resolver.service';
const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [recipeResolverService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'create-recipe', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [recipeResolverService],
      },
      {
        path: ':id/edit-recipe',
        component: RecipeEditComponent,
        resolve: [recipeResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
