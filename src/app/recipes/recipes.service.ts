import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { userModel } from '../auth/user.model';

@Injectable()
export class RecipeService {
  constructor(private httpS: HttpClient, private authS: AuthService) {}
  private recipes: Recipe[] = [];
  user: userModel;

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index) {
    return this.recipes.slice()[index];
  }
  recipeChanged = new Subject<any>();
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  storeRecipe() {
    const recipes = this.getRecipes();
    this.authS.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.httpS.put(
            'https://recipe-book-2023-7a5ff-default-rtdb.firebaseio.com/recipes.json?auth=' +
              user.token,
            recipes
          );
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.authS.user.pipe(
      take(1),
      exhaustMap((user: any) => {
        return this.httpS.get(
          'https://recipe-book-2023-7a5ff-default-rtdb.firebaseio.com/recipes.json?auth=' +
            user?.token
        );
      }),
      map((recipes: any) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((res: any) => {
        this.setRecipes(res);
      })
    );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
