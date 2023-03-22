import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoaderComponent } from './loader/loader.component';
import { OnlyNumberDirective } from './only-number.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const declarables = [
  AlertComponent,
  PlaceholderDirective,
  DropdownDirective,
  LoaderComponent,
  OnlyNumberDirective,
  PageNotFoundComponent,
];
@NgModule({
  imports: [CommonModule],
  exports: [...declarables, CommonModule],
  declarations: [...declarables],
})
export class sharedModule {}
