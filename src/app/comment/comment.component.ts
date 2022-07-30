import { Component, Input } from '@angular/core';
import { Comment, emptyComment } from '../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: Comment = emptyComment();
  @Input() isLast: boolean = false;

}
