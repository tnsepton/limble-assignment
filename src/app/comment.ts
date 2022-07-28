import { Employee } from "./employee"

export interface Comment {
  id: number,
  createdAt: string,
  comment: string,
  author: Employee
}
