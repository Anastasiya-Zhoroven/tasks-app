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

}
