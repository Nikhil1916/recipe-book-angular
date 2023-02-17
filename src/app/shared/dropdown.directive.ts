import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  // @HostBinding('class.open') isOpen: Boolean = false; will directly toggle the class
  @HostListener('click') toggleOpen() {
    if (!this.elRef.nativeElement.classList.contains('open')) {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');
    }
    // this.isOpen=!this.isOpen;
  }
}
