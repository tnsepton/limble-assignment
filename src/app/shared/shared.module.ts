import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { IconTextButtonComponent } from './button/icon-text-button.component';



@NgModule({
  declarations: [
    SvgIconComponent,
    IconTextButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SvgIconComponent,
    IconTextButtonComponent
  ]
})
export class SharedModule { }
