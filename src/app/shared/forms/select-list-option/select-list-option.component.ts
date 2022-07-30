import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emptyOption, Option } from './option';

@Component({
  selector: 'select-list-option',
  templateUrl: './select-list-option.component.html',
  styleUrls: ['./select-list-option.component.css']
})
export class SelectListOptionComponent implements OnInit, DoCheck {
  @Input() option: Option = emptyOption();
  @Input() isFirst: boolean = false;
  @Input() activeOption: Option = emptyOption();

  @Output() onActivated: EventEmitter<Option> = new EventEmitter();
  @Output() onSelected: EventEmitter<Option> = new EventEmitter();

  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.isFirst) this.isActive = true;
  }

  ngDoCheck(): void {
    if(this.activeOption
      && this.option !== this.activeOption
    ) this.deactivateOption();
  }

  activateOption(): void {
    this.onActivated.emit(this.option);
    this.isActive = true;
  }

  deactivateOption(): void {
    this.isActive = false;
  }

  selectOption(): void {
    this.onSelected.emit(this.option.value);
  }

}
