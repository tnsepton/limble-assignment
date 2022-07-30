import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-text-button',
  template: `
    <button class="main-btn">
      <svg-icon icon={{icon}}></svg-icon>
      <span><ng-content></ng-content></span>
    </button>
  `,
  styles: [
    `span {
      margin-left: 7px;
    }`
  ]
})
export class IconTextButtonComponent {
  @Input() icon: string = '';

}
