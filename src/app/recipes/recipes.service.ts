import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'this is a test',
      'https://img.freepik.com/premium-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-background_2829-4751.jpg',
      [new Ingredient('onion', 23), new Ingredient('potato', 11)]
    ),
    new Recipe(
      'Test Recipe 2',
      'this is a test',
      'https://img.freepik.com/premium-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-background_2829-4751.jpg',
      [new Ingredient('tomato', 10), new Ingredient('curry', 5)]
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}
