import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-button',
  template: `
    <button>
      <svg-icon icon={{icon}}></svg-icon>
      {{text}}
    </button>
  `,
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
  @Input() icon: string = '';
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
