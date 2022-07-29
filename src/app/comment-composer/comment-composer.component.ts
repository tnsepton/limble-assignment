import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment, emptyComment } from '../comment';
import { User } from '../user';
import { UserService } from '../user.service';

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
  tagSuggestions: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.composerElement.nativeElement.focus();
  }

  handleInput(e: any): void {
    if(e.type === 'insertParagraph') {
      this.addComment(e);
      return;
    }

    let tagSearchString = this.getTagSearchString();
    if(typeof tagSearchString === 'string') {
      this.tagSuggestions = this.userService.getUsersByNameSearch(tagSearchString);
      console.log(this.tagSuggestions);
    }
    else {
      this.tagSuggestions = [];
    }

    this.comment.body = e.target.textContent;
  }

  getTagSearchString(): string | boolean {
    let range = window.getSelection()?.getRangeAt(0);
    let start = range?.startOffset || 0;
    let textContent = range?.startContainer.textContent || '';
    let searchString = '';
    let char = '';
    let i = 1;
    let pos = start - 1;

    while(i <= 25 && pos >= 0) {
      char = textContent[pos];
      if(char === '@') {
        if(pos === 0 || textContent[pos - 1] === ' ') {
          return searchString;
        }

        return false;
      }

      searchString = char + searchString;
      i++;
      pos--;
    }

    return false;
  }

  addComment(e: any): void {
    e.preventDefault();
    let comment = this.comment;
    if(comment.body === '') {
      alert('Comment cannot be submitted without text.');
      return;
    }

    this.onSubmitEvent.emit(comment);
    this.closeComposer();
  }

  closeComposer(): void {
    this.onCloseEvent.emit();
  }

}
