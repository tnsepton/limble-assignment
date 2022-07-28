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

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.comments = this.commentService.getComments();
  }

}
