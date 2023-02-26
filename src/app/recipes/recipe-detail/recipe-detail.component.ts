import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private shoppingListS: ShoppingListService,
    private route: ActivatedRoute,
    private recipeS: RecipeService
  ) {}
  recipe: Recipe;
  ngOnInit() {
    this.route.params.subscribe((res) => {
      const id = res.id;
      this.recipe = this.recipeS.getRecipe(+id);
    });
  }
  addToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((element: Ingredient) => {
      this.shoppingListS.addIngredients(element);
    });
  }
}
