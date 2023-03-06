import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('mango', 6),
  ];
  ingredientAdded = new Subject<Boolean>(); //being called for update as well
  ingredientEdit = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(true);
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  updateIngredient(index, newIngredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(true);
  }

  deleteIngredient(index) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(true);
  }
}
