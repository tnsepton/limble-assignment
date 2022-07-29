import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from './option';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() title: string = '';

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(value: any): void {
    this.onSelect.emit(value);
  }

}
