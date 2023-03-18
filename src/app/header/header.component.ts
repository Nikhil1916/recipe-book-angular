import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private recipeS: RecipeService, private authS: AuthService) {}
  collapsed = true;
  subscription: Subscription;
  isLoggedIn = false;
  @Output() featureEmitter = new EventEmitter<string>();
  ngOnInit() {
    this.subscription = this.authS.user.subscribe((res) => {
      this.isLoggedIn = !!res;
      console.log(this.isLoggedIn);
    });
  }
  onSelect(feature) {
    this.featureEmitter.emit(feature);
  }
  storeRecipes() {
    this.recipeS.storeRecipe();
  }
  fetchRecipes() {
    this.recipeS.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onLogout() {
    this.authS.onLogout();
    // this.
  }
}
