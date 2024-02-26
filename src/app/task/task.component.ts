import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { TaskService } from '../task.service';
import { Task } from '../task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {  
  @Input() taskItem!: Task;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  iconSign: any = faCheck;

  constructor (private taskService: TaskService){}

  ngOnInit() {
    this.iconSign = this.taskItem.completed ? faCheck : faXmark;
  }

  deleteTask() {
    this.delete.emit(this.taskItem.id);
  }
  

}
