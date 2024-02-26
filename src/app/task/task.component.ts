import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { faCheck, faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { TaskService } from '../task.service';
import { Task } from '../task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit{  
  @Input() taskItem!: Task;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<{id: number, completed:boolean}> = new EventEmitter();
  iconSign: IconDefinition = faCheck;

  constructor (private taskService: TaskService) {}

  ngOnInit(): void {
    this.iconSign = this.taskItem.completed ? faCheck : faXmark;
  }

  deleteTask(): void {
    this.delete.emit(this.taskItem.id);
  }

  updateTask(): void {
    this.iconSign = this.taskItem.completed ? faXmark : faCheck;
    this.update.emit({id: this.taskItem.id, completed: !this.taskItem.completed});
  }
}
