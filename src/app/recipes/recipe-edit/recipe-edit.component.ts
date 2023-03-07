import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  isEdit: Boolean = false;
  recipeForm: FormGroup;
  imagePath = '';
  constructor(
    private route: ActivatedRoute,
    private recipeS: RecipeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.id = +res['id'];
      this.isEdit = res['id'] != null;
      this.init();
    });
  }

  private init() {
    let recipeName = '';
    let imgPath = '';
    let desc = '';
    const ingredientsArray = new FormArray([]);
    if (this.isEdit) {
      this.recipe = this.recipeS.getRecipe(this.id);
      recipeName = this.recipe.name;
      this.imagePath = imgPath = this.recipe.imagePath;
      desc = this.recipe.description;
      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach((res) => {
          ingredientsArray.push(
            new FormGroup({
              name: new FormControl(res.name, Validators.required),
              amount: new FormControl(res.amount),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imgPath, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients: ingredientsArray,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.isEdit) {
      this.recipeS.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeS.addRecipe(newRecipe);
    }
    this.navigate();
  }

  controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    const arr = this.recipeForm.get('ingredients') as FormArray;
    arr.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  navigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteIngredient(index) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
