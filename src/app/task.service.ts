import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks!: Task[];
  public tasksSubject: Subject<Task[]> = new Subject<Task[]>();

  constructor (private readonly http: HttpClient, private readonly userService: UserService) { }

  setTasks (tasks: Task[]): void {
    this.tasks = tasks;
    this.tasksSubject.next(tasks);
  }

  addTask (): void {
    const idGenerated = (this.tasks.length > 0) ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const userIdGenerated = Math.floor(Math.random() * 10) + 1;

    const newTask: Task = {
      userId: userIdGenerated,
      id: idGenerated,
      title: `Task ${idGenerated}`,
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask (id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  updateTask (id: number, completed: boolean): void {
    const task: Task = this.tasks.find(task => task.id === id)!;
    task.completed = completed;
    this.tasksSubject.next(this.tasks);
  }
}
