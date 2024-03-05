import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Task } from '../task.interface'
import { TaskService } from '../task.service'
import { faBriefcase, IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  constructor (private readonly taskService: TaskService, public route: ActivatedRoute, private readonly router: Router) {}
  taskItem!: Task
  iconSign: IconDefinition = faBriefcase

  ngOnInit (): void {
    const id = this.route.snapshot.params['id']
    this.taskItem = this.taskService.getTaskById(+id)
  }

  goBack (): void {
    this.router.navigate(['/tasks']);
  
  }
}
