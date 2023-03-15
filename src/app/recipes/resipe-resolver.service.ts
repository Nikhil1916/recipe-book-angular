import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class recipeResolverService implements Resolve<Recipe[]> {
  constructor(private recipeS: RecipeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeS.getRecipes();
    if (this.recipeS.getRecipes().length == 0) {
      return this.recipeS.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
