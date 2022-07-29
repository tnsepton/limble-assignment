import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getSvg } from './svg-icons';

@Component({
  selector: 'svg-icon',
  template: `
    <i
      class="icon-container"
      [innerHTML]="svg"
    ></i>
  `,
  styles: [
    `:host {
      vertical-align: middle;
    }`
  ]
})
export class SvgIconComponent implements OnInit {
  @Input() icon: string = '';

  svg: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setSvg();
  }

  setSvg(): void {
    let svg = getSvg(this.icon);
    this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
  }

}
