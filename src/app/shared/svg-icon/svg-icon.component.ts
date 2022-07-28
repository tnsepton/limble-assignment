import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'svg-icon',
  template: `
    <i
      [innerHTML]="svg"
    ></i>
  `,
  styleUrls: ['./svg-icon.component.css']
})
export class SvgIconComponent implements OnInit {
  @Input() icon: string = '';

  svg: SafeHtml = '';

  icons: { [icon: string]: string} = {
    chatBubble: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.097 45.097" xmlns:v="https://vecta.io/nano"><path d="M11.022 35.237l-.719 9.187a.63.63 0 0 0 .267.563.62.62 0 0 0 .355.11.64.64 0 0 0 .266-.059l13.011-6.1c10.016-.846 17.858-9.374 17.858-19.426C42.06 8.753 33.308 0 22.549 0S3.037 8.753 3.037 19.512c.001 6.182 2.984 12.054 7.985 15.725zM22.549 1.252c10.069 0 18.261 8.192 18.261 18.262 0 9.46-7.388 17.449-16.818 18.188-.075.005-.148.025-.219.057l-12.139 5.694.663-8.468a.63.63 0 0 0-.262-.559c-4.851-3.423-7.746-8.998-7.746-14.911C4.288 9.444 12.48 1.252 22.549 1.252z" fill="#010002"/></svg>`
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setSvg();
  }

  setSvg(): void {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.icons[this.icon]);
  }

}
