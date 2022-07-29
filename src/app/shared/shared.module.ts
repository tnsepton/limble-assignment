import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { IconTextButtonComponent } from './buttons/icon-text-button.component';
import { IconButtonComponent } from './buttons/icon-button.component';
import { SelectListComponent } from './forms/select-list/select-list.component';
import { SelectListOptionComponent } from './forms/select-list-option/select-list-option.component';



@NgModule({
  declarations: [
    SvgIconComponent,
    IconTextButtonComponent,
    IconButtonComponent,
    SelectListComponent,
    SelectListOptionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SvgIconComponent,
    IconTextButtonComponent,
    IconButtonComponent,
    SelectListComponent,
    SelectListOptionComponent
  ]
})
export class SharedModule { }
