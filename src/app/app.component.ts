import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    this.taskService.addTask();
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
}
