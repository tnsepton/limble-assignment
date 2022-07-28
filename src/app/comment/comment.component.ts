import { Component, Input, OnInit } from '@angular/core';
import { Comment, emptyComment } from '../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment = emptyComment();
  @Input() isLast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
