import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeS: RecipeService) {}
  ngOnInit() {
    this.recipeS.recipeSelected.subscribe((res: Recipe) => {
      this.recipe = res;
    });
  }
}
