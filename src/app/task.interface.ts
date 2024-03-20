import { User } from "./user.interface";

export interface Task {
  userId: number
  id: number
  title: string
  completed: boolean
  user?: User
}
