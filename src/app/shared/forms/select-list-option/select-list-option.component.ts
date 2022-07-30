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

  @Output() onMouseover: EventEmitter<Option> = new EventEmitter();
  @Output() onSelected: EventEmitter<Option> = new EventEmitter();

  isActive: boolean = false;

  ngOnInit(): void {
    if(this.isFirst) this.activateOption();
  }

  ngDoCheck(): void {
    if(this.option !== this.activeOption) {
      this.deactivateOption();
      return;
    }

    this.activateOption();
  }

  handleMouseover(): void {
    this.onMouseover.emit(this.option);
  }

  activateOption(): void {
    this.isActive = true;
  }

  deactivateOption(): void {
    this.isActive = false;
  }

  selectOption(): void {
    this.onSelected.emit(this.option.value);
  }

}
