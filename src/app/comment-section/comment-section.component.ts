import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  comments: Comment[] = [];
  commenting: boolean = false;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.comments = this.commentService.getComments();
  }

  toggleCommentState(): void {
    this.commenting = !this.commenting;
  }

  addComment(comment: Comment): void {
    this.commentService.addComment(comment);
    this.fetchComments();
  }

}
