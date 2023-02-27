import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private shoppingListS: ShoppingListService) {}
  ingredients: Ingredient[];
  private subscription: Subscription;
  ngOnInit(): void {
    this.ingredients = this.shoppingListS.getIngredients();
    this.subscription = this.shoppingListS.ingredientAdded.subscribe(
      (res: boolean) => {
        if (res) {
          this.ingredients = this.shoppingListS.getIngredients();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
