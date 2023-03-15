import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private recipeS: RecipeService) {}
  collapsed = true;
  @Output() featureEmitter = new EventEmitter<string>();
  onSelect(feature) {
    this.featureEmitter.emit(feature);
  }
  storeRecipes() {
    this.recipeS.storeRecipe();
  }
  fetchRecipes() {
    this.recipeS.fetchRecipes().subscribe();
  }
}
