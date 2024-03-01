import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { faCheck, faXmark, IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons'

import { TaskService } from '../task.service'
import { Task } from '../task.interface'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnChanges {
  @Input() taskItem!: Task 
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @Output() update = new EventEmitter<{ id: number, completed: boolean }>()
  iconSign: IconDefinition = faCheck
  deleteSign: IconDefinition = faTrash

  constructor (private readonly taskService: TaskService) {}

  ngOnChanges (): void {
    this.iconSign = this.taskItem.completed ? faCheck : faXmark
  }

  deleteTask (): void {
    this.delete.emit(this.taskItem.id)
  }

  updateTask (): void {
    this.iconSign = this.taskItem.completed ? faXmark : faCheck
    this.update.emit({ id: this.taskItem.id, completed: !this.taskItem.completed })
  }
}
