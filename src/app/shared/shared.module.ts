import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { IconButtonComponent } from './button/icon-button.component';



@NgModule({
  declarations: [
    SvgIconComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SvgIconComponent,
    IconButtonComponent
  ]
})
export class SharedModule { }
