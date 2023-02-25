import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  constructor(private shoppingListS: ShoppingListService) {}
  @Input() recipe: Recipe;
  addToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((element: Ingredient) => {
      this.shoppingListS.addIngredients(element);
    });
  }
}
