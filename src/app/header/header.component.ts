import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed = true;
  @Output() featureEmitter = new EventEmitter<string>();
  onSelect(feature) {
    this.featureEmitter.emit(feature);
  }
}
