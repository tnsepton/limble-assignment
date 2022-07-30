import { User } from "./user"

export interface Comment {
  id: number,
  createdAt: string,
  body: string,
  author: User,
  tagged: number[]
}

export function emptyComment(): Comment {
  return {
    id: 0,
    createdAt: '',
    body: '',
    author: {
      id: 0,
      name: ''
    },
    tagged: []
  }
}
