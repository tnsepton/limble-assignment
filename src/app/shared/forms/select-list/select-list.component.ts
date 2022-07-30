import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { emptyOption, Option } from '../select-list-option/option';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() options: Option[] = [];
  @Input() title: string = '';
  @Input() keydownEvents: Observable<any> = new Observable();

  @Output() onSelected: EventEmitter<any> = new EventEmitter();

  activeOption: Option = emptyOption();
  private keydownEventsSubscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.activeOption = this.options[0];
    this.keydownEventsSubscription = this.keydownEvents.subscribe((e) => this.handleKeydown(e));
  }

  ngOnDestroy(): void {
    this.keydownEventsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['options']) {
      this.activeOption = this.options[0];
    }
  }

  selectOption(value: any): void {
    this.onSelected.emit(value);
  }

  onOptionMouseover(option: Option): void {
    this.activeOption = option;
  }

  handleKeydown(e: any): void {
    switch(e.which) {
      case 13:
        this.selectOption(this.activeOption.value);
        return;
      case 38:
        this.activateOptionAbove();
        return;
      case 40:
        this.activateOptionBelow();
    }
  }

  activateOptionAbove(): void {
    const index = this.getActiveOptionIndex();
    if(index === -1 || index === 0) {
      return;
    }

    this.activeOption = this.options[index - 1];
  }

  activateOptionBelow(): void {
    const index = this.getActiveOptionIndex();
    const options = this.options;
    if(index === -1 || index === options.length) {
      return;
    }

    this.activeOption = options[index + 1];
  }

  getActiveOptionIndex(): number {
    const activeOption = this.activeOption;
    for(const [i, option] of this.options.entries()) {
      if(option === activeOption) return i;
    }

    return -1;
  }

}
