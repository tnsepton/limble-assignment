import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment, emptyComment } from '../comment';
import { Option } from '../shared/forms/select-list-option/option';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comment-composer',
  templateUrl: './comment-composer.component.html',
  styleUrls: ['./comment-composer.component.css']
})
export class CommentComposerComponent implements AfterViewInit {
  @Input() closeButton: boolean = false;

  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitEvent: EventEmitter<Comment> = new EventEmitter();

  @ViewChild('composer') composerElement!: ElementRef;

  tagSuggestions: Option[] = [];
  range: any;
  keydownSubject: Subject<any> = new Subject<any>();

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.focusComposerElement();
  }

  focusComposerElement(): void {
    this.composerElement.nativeElement.focus();

    const range = this.range;
    if(range) {
      let selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  setTagSuggestions(tagSuggestions: User[]): void {
    const options: Option[] = [];
    for(const tagSuggestion of tagSuggestions) {
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
  }

  setRange(): void {
    this.range = window.getSelection()?.getRangeAt(0);
  }

  ensureWithinTextNode(): void {
    const range = this.range;
    if(range.startContainer.nodeType !== 3) {
      const node = document.createTextNode('\u{200B}');
      range.insertNode(node);
      range.setEnd(node, 0);
      range.collapse();
    }
  }

  handleTagSuggestions(): void {
    const tagSearchString = this.getTagSearchString();
    if(typeof tagSearchString === 'string') {
      const tagSuggestions = this.userService.getUsersByNameSearch(tagSearchString);
      this.setTagSuggestions(tagSuggestions);
    }
    else {
      this.setTagSuggestions([]);
    }
  }

  getTagSearchString(): string | boolean {
    const range = this.range;
    const start = range?.startOffset || 0;
    const textContent = range?.startContainer.textContent || '';
    let searchString = '';
    let char = '';
    let i = 1;
    let pos = start - 1;

    while(i <= 25 && pos >= 0) {
      char = textContent[pos];
      if(char === '@') {
        if(this.shouldTag(range, textContent, pos)) {
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

  shouldTag(range: any, textContent: string, pos: number): boolean {
    const prevSibling = range.startContainer.previousElementSibling;
    const className = (prevSibling) ? prevSibling.className : '';
    const char = textContent[pos - 1] || '';

    return (
      (pos === 0 && className !== 'tagged-user')
      || /\s/.test(char)
      || char.charCodeAt(0) === 8203
    );
  }

  handleKeydown(e: any): void {
    if(this.shouldSendEvent(e)) {
      e.preventDefault();
      this.keydownSubject.next(e);
      return;
    }

    if(e.which === 13) {
      this.addComment(e);
    }
  }

  shouldSendEvent(e: any): boolean {
    const keycodes = [13, 38, 40];
    const isArrowOrEnterKey = keycodes.includes(e.which);

    return (
      this.tagSuggestions.length > 0
      && isArrowOrEnterKey
    )
  }

  addComment(e: any): void {
    e.preventDefault();
    if(this.composerElement.nativeElement.textContent === '') {
      alert('Comment cannot be submitted without text.');
      return;
    }

    const comment: Comment = this.prepareComment();

    this.onSubmitEvent.emit(comment);
    this.closeComposer();
  }

  prepareComment(): Comment {
    const comment: Comment = emptyComment();
    comment.body = this.prepareCommentBody();
    comment.tagged = this.prepareTaggedUsers();

    return comment;
  }

  prepareCommentBody(): string {
    const ele = this.composerElement.nativeElement;
    const text = ele.textContent;
    let body = '';

    for(const char of text) {
      const charCode = char.charCodeAt(0);

      switch(charCode) {
        case 160:
          body += ' ';
          break;
        case 8203:
          body += '';
          break;
        default:
          body += char;
      }
    }

    return body;
  }

  prepareTaggedUsers(): number[] {
    const ele = this.composerElement.nativeElement;
    const taggedUsers: number[] = [];
    for(const child of ele.children) {
      if(child.className !== 'tagged-user') continue;

      taggedUsers.push(parseInt(child.id.split('-')[2]));
    }

    return taggedUsers;
  }

  closeComposer(): void {
    this.onCloseEvent.emit();
  }

  tagUser(user: User): void {
    this.focusComposerElement();
    this.insertTagMarkup(user);
    this.resetTagSuggestions();
  }

  insertTagMarkup(user: User): void {
    this.setupRangeForTagMarkup();
    this.insertTagSpan(user);
    this.insertTextNode();
  }

  setupRangeForTagMarkup(): void {
    const range = this.range;
    const start = range.startOffset;
    const startContainer = range.startContainer;
    const textContent = startContainer.textContent || '';
    let pos = start - 1;
    let char;

    while(pos >= 0) {
      char = textContent[pos];
      if(char === '@') {
        range.setStart(startContainer, pos);
        break;
      }

      pos--;
    }
  }

  insertTagSpan(user: User): void {
    const node = this.createTagNode(user);
    const range = this.range;

    range.deleteContents();
    range.insertNode(node);
    range.collapse();
  }

  createTagNode(user: User): Node {
    const node = document.createElement('span');
    node.className = 'tagged-user';
    node.id = 'tagged-user-' + user.id;
    node.textContent = '@' + user.name;
    node.contentEditable = 'false';

    return node;
  }

  insertTextNode(): void {
    const range = this.range;
    const node = document.createTextNode('\u00A0');
    range.insertNode(node);
    range.collapse();
  }

  resetTagSuggestions(): void {
    this.setTagSuggestions([]);
  }

}
