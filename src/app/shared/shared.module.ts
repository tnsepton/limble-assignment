import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { IconTextButtonComponent } from './buttons/icon-text-button.component';
import { IconButtonComponent } from './buttons/icon-button.component';
import { SelectListComponent } from './forms/select-list/select-list.component';



@NgModule({
  declarations: [
    SvgIconComponent,
    IconTextButtonComponent,
    IconButtonComponent,
    SelectListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SvgIconComponent,
    IconTextButtonComponent,
    IconButtonComponent,
    SelectListComponent
  ]
})
export class SharedModule { }
