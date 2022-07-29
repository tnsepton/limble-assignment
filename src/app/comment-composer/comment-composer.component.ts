import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment, emptyComment } from '../comment';

@Component({
  selector: 'app-comment-composer',
  templateUrl: './comment-composer.component.html',
  styleUrls: ['./comment-composer.component.css']
})
export class CommentComposerComponent implements OnInit, AfterViewInit {
  @Input() closeButton: boolean = false;

  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitEvent: EventEmitter<Comment> = new EventEmitter();

  @ViewChild('composer') composerElement!: ElementRef;

  comment: Comment = emptyComment();

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.composerElement.nativeElement.focus();
  }

  handleKeypress(e: any): void {
    if(e.keyCode === 13) {
      this.addComment(e);
      return;
    }
  }

  addComment(e: any): void {
    e.preventDefault();
    let comment = this.comment;
    if(comment.body === '') {
      alert('Comment cannot be submitted without text.');
    }

    this.onSubmitEvent.emit(comment);
    this.closeComposer();
  }

  closeComposer(): void {
    this.onCloseEvent.emit();
  }

}
