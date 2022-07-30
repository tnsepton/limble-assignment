import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Option } from '../select-list-option/option';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit, OnChanges {
  @Input() options: Option[] = [];
  @Input() title: string = '';

  @Output() onSelected: EventEmitter<any> = new EventEmitter();

  activeOption: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      this.activeOption = null;
  }

  selectOption(value: any): void {
    this.onSelected.emit(value);
  }

  onOptionActivated(option: Option): void {
    this.activeOption = option;
  }

}
