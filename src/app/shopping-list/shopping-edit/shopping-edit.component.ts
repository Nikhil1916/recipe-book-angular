import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListS: ShoppingListService) {}
  Subscription;
  editMode: boolean = false;
  editIndex;
  editItem: Ingredient;
  @ViewChild('formVal') form: NgForm;
  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(
      form.form.get('name').value,
      form.form.value.amount
    );
    if (this.editMode) {
      this.shoppingListS.updateIngredient(this.editIndex, newIngredient);
    } else this.shoppingListS.addIngredients(newIngredient);
    this.clearForm();
  }

  ngOnInit(): void {
    this.Subscription = this.shoppingListS.ingredientEdit.subscribe((res) => {
      this.editMode = true;
      this.editIndex = res;
      this.editItem = this.shoppingListS.getIngredient(this.editIndex);
      this.form.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      });
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    if (!this.editMode) return;
    this.shoppingListS.deleteIngredient(this.editIndex);
    this.clearForm();
  }
}
