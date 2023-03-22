import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  imports: [],
  exports: [],
  providers: [RecipeService, ShoppingListService],
})
export class coreModule {}
