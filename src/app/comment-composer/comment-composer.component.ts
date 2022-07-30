import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment, emptyComment } from '../comment';
import { Option } from '../shared/forms/select-list-option/option';
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
  tagSuggestions: Option[] = [];
  range: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.focusComposerElement();
  }

  focusComposerElement(): void {
    this.composerElement.nativeElement.focus();

    let range = this.range;
    if(range) {
      let selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  setTagSuggestions(tagSuggestions: User[]): void {
    let options: Option[] = [];
    for(let tagSuggestion of tagSuggestions) {
      options.push({
        value: tagSuggestion,
        label: tagSuggestion.name
      })
    }

    this.tagSuggestions = options;
  }

  handleInput(e: any): void {
    this.setRange();
    this.ensureWithinTextNode();
    this.handleTagSuggestions();
    this.setCommentBody(e);
  }

  setRange(): void {
    this.range = window.getSelection()?.getRangeAt(0);
  }

  ensureWithinTextNode(): void {
    let range = this.range;
    if(range.startContainer.nodeType !== 3) {
      let node = document.createTextNode('\u{200B}');
      range.insertNode(node);
      range.setEnd(node, 0);
      range.collapse();
    }
  }

  setCommentBody(e: any): void {
    this.comment.body = e.target.textContent;
  }

  handleTagSuggestions(): void {
    let tagSearchString = this.getTagSearchString();
    if(typeof tagSearchString === 'string') {
      let tagSuggestions = this.userService.getUsersByNameSearch(tagSearchString);
      this.setTagSuggestions(tagSuggestions);
    }
    else {
      this.setTagSuggestions([]);
    }
  }

  getTagSearchString(): string | boolean {
    let range = this.range;
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

  handleKeydown(e: any): void {
    if(e.which === 13) {
      this.addComment(e);
    }
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

  tagUser(user: User): void {
    this.comment.tagged.push(user.id);
    this.focusComposerElement();
    this.insertTagMarkup(user.name);
    this.resetTagSuggestions();
  }

  insertTagMarkup(name: string): void {
    this.setupRangeForTagMarkup();
    this.insertTagSpan(name);
    this.insertTextNode();
  }

  setupRangeForTagMarkup(): void {
    let range = this.range;
    let start = range.startOffset;
    let startContainer = range.startContainer;
    let textContent = startContainer.textContent || '';
    let pos = start - 1;
    let char;

    while(pos >= 0) {
      char = textContent[pos];
      if(char === '@') {
        if(pos === 0 || textContent[pos - 1] === ' ') {
          range.setStart(startContainer, pos);
          break;
        }
      }

      pos--;
    }
  }

  insertTagSpan(name: string): void {
    let node = this.createTagNode(name);
    let range = this.range;

    range.deleteContents();
    range.insertNode(node);
    range.collapse();
  }

  createTagNode(name: string): Node {
    let node = document.createElement('span');
    node.className = 'tagged-user';
    node.textContent = '@' + name;
    node.contentEditable = 'false';

    return node;
  }

  insertTextNode(): void {
    let range = this.range;
    let node = document.createTextNode('\u00A0');
    range.insertNode(node);
    range.collapse();
  }

  resetTagSuggestions(): void {
    this.setTagSuggestions([]);
  }

}
