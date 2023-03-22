import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription;
  constructor(private recipeS: RecipeService) {}
  ngOnInit() {
    // this.recipeS.getRecipes(); //(for initial rendering) commentes as added resolver
    this.recipes = this.recipeS.getRecipes();
    this.subscription = this.recipeS.recipeChanged.subscribe((res) => {
      this.recipes = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
