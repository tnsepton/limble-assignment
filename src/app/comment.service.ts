import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [
    {
        id: 1,
        createdAt: '2022-07-27 10:04:48',
        body: 'I created this task to be done.',
        author: {
          id: 1,
          name: 'Kevin'
        }
    },
    {
      id: 2,
      createdAt: '2022-07-27 10:52:29',
      body: 'This task is definitely a task, and I will do it.',
      author: {
        id: 2,
        name: 'Jeff'
      }
    },
    {
      id: 3,
      createdAt: '2022-07-27 13:34:21',
      body: 'Cool thanks for tasking so well.',
      author: {
        id: 1,
        name: 'Kevin'
      }
    }
  ]
  private datePipe = new DatePipe('en-US');

  constructor() { }

  getComments(): Comment[] {
    return this.comments;
  }

  addComment(comment: Comment): void {
    comment = this.prepareComment(comment);
    this.comments.push(comment);
  }

  prepareComment(comment: Comment): Comment {
    let comments = this.comments;
    comment.id = comments[comments.length - 1].id + 1;
    let createdAt = this.datePipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss');
    comment.createdAt = createdAt || '';
    comment.author = {
      id: 0,
      name: 'Current User'
    }

    return comment;
  }
}
