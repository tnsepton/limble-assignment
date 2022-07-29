import { Component, Input, OnInit } from '@angular/core';

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
export class IconTextButtonComponent implements OnInit {
  @Input() icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
