import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-button',
  template: `
    <button class="icon-button">
      <svg-icon
        class="no-padding"
        icon={{icon}}
      ></svg-icon>
    </button>
  `,
  styles: [
    `.icon-button {
      background: none;
      border: none;
      border-radius: 3px;
      width: 24px;
      height: 24px;
      padding: 3px;
      font-size: 18px;
    }`,
    `.icon-button:hover {
      background-color: #eee;
    }`
  ]
})
export class IconButtonComponent implements OnInit {
  @Input() icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
