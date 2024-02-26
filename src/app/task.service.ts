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
  
  getTasks() {
    return this.tasks; 
  }

  addTask() {
    let idGenerated = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;

    let newTask:Task = {
      id: idGenerated,
      title: `Task ${idGenerated}`,
      completed: false
    }
    this.tasks.push(newTask);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

}
