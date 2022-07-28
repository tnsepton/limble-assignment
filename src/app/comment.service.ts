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
        comment: 'I created this task to be done.',
        author: {
          id: 1,
          name: 'Kevin'
        }
    },
    {
      id: 2,
      createdAt: '2022-07-27 10:52:29',
      comment: 'This task is definitely a task that I will do.',
      author: {
        id: 2,
        name: 'Jeff'
      }
    }
  ]

  constructor() { }

  getComments(): Comment[] {
    return this.comments;
  }
}
