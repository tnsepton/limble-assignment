import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-comment-composer',
  templateUrl: './comment-composer.component.html',
  styleUrls: ['./comment-composer.component.css']
})
export class CommentComposerComponent implements AfterViewInit {
  @Input() closeButton: boolean = false;

  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('composer') composerElement!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
      this.composerElement.nativeElement.focus();
  }

  closeComposer(): void {
    this.onCloseEvent.emit();
  }

}
