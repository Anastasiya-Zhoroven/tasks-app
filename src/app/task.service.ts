import { Injectable } from '@angular/core'
import { Task } from './task.interface'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = []

  constructor () {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks)
    } else {
      this.tasks = [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: false },
        { id: 4, title: 'Task 4', completed: false },
        { id: 5, title: 'Task 5', completed: false }
      ]
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }

  getTasks (): Task[] {
    return this.tasks
  }

  getTaskById (id: number): Task {
    return this.tasks.find(task => task.id === id)!
  }

  addTask (): void {
    const idGenerated = (this.tasks.length > 0) ? this.tasks[this.tasks.length - 1].id + 1 : 1

    const newTask: Task = {
      id: idGenerated,
      title: `Task ${idGenerated}`,
      completed: false
    }
    this.tasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  deleteTask (id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  updateTask (id: number, completed: boolean): void {
    const task: Task = this.getTaskById(id)
    task.completed = completed
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
