import { Injectable } from '@angular/core';
import { Task } from './task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {id: 1, title: 'Task 1', completed: true},
    {id: 2, title: 'Task 2', completed: false},
  ];
    
  constructor() { }
  
  getTasks(): Task[] {
    return this.tasks; 
  }

  getTaskById(id: number): Task {
    return this.tasks.find(task => task.id === id)!;
  }

  addTask(): void {
    let idGenerated = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;

    let newTask:Task = {
      id: idGenerated,
      title: `Task ${idGenerated}`,
      completed: false,
    }
    this.tasks.push(newTask);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }



  updateTask(id: number, completed: boolean): void {
    let task: Task = this.getTaskById(id);
    task.completed = completed;
  }

}
