import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  constructor(private httpS: HttpClient) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe 1',
  //     'this is a test',
  //     'https://img.freepik.com/premium-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-background_2829-4751.jpg',
  //     [new Ingredient('onion', 23), new Ingredient('potato', 11)]
  //   ),
  //   new Recipe(
  //     'Test Recipe 2',
  //     'this is a test',
  //     'https://img.freepik.com/premium-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-background_2829-4751.jpg',
  //     [new Ingredient('tomato', 10), new Ingredient('curry', 5)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
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
    return this.httpS
      .put(
        'https://recipe-book-2023-7a5ff-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.httpS
      .get(
        'https://recipe-book-2023-7a5ff-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((res) => {
          this.setRecipes(res);
        })
      );
    // .subscribe((res: Recipe[]) => {
    //   console.log(res);
    // });
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
