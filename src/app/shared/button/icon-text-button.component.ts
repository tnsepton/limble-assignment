import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-text-button',
  template: `
    <button class="main-btn">
      <svg-icon icon={{icon}}></svg-icon>
      <ng-content></ng-content>
    </button>
  `
})
export class IconTextButtonComponent implements OnInit {
  @Input() icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
