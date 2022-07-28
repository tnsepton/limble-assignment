import { User } from "./user"

export interface Comment {
  id: number,
  createdAt: string,
  body: string,
  author: User
}
