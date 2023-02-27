import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('mango', 6),
  ];
  ingredientAdded = new Subject<Boolean>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(true);
  }
}
