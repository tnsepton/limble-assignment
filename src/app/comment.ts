import { User } from "./user"

export interface Comment {
  id: number,
  createdAt: string,
  comment: string,
  author: User
}
