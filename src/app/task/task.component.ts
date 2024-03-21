import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faCheck, faXmark, IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';

import { TaskService } from '../task.service';
import { Task } from '../task.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnChanges {
  @Input() taskItem!: Task;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateEvent: EventEmitter<{ id: number, completed: boolean }> = new EventEmitter<{ id: number, completed: boolean }>();
  iconSign: IconDefinition = faCheck;
  deleteSign: IconDefinition = faTrash;

  constructor (private readonly taskService: TaskService, private readonly router: Router) { }

  ngOnChanges (): void {
    this.iconSign = this.taskItem.completed ? faCheck : faXmark;
  }

  deleteTask (): void {
    this.deleteEvent.emit(this.taskItem.id);
  }

  updateTask (): void {
    this.iconSign = this.taskItem.completed ? faXmark : faCheck;
    this.updateEvent.emit({ id: this.taskItem.id, completed: !this.taskItem.completed });
  }

  navigateToTaskCard (): void {
    this.router.navigate(['tasks', this.taskItem.id]);
  }
}
