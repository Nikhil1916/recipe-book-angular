import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
})
export class OnlyNumberDirective {
  constructor() {}
  @HostListener('keypress', ['$event']) onlyNumber(event) {
    if ((event.which < 48 && event.which !== 46) || event.which > 56)
      event.preventDefault();
  }
}
