import { Component, OnInit } from '@angular/core'
import { TaskService } from '../task.service'
import { Task } from '../task.interface'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = []
  toggleValue: boolean = false
  status: string = 'all'

  constructor (private readonly taskService: TaskService, private readonly router: Router, public route: ActivatedRoute) {
    const storedToggleValue = localStorage.getItem('toggleValue')
    this.toggleValue = storedToggleValue ? JSON.parse(storedToggleValue) : false
  }

  ngOnInit (): void {
    const params = this.route.snapshot.queryParams
    this.status = params['status'] || 'all'
    this.tasks = this.taskService.filterTasksByStatus(this.status)
  }

  addTask (): void {
    this.taskService.addTask()
    this.tasks = this.taskService.filterTasksByStatus(this.status)
  }

  deleteTask (id: number): void {
    this.taskService.deleteTask(id)
    this.tasks = this.taskService.filterTasksByStatus(this.status)
  }

  updateTask (id: number, completed: boolean): void {
    this.taskService.updateTask(id, completed)
    this.tasks = this.taskService.filterTasksByStatus(this.status)
  }

  toggleChanged (): void {
    localStorage.setItem('toggleValue', JSON.stringify(this.toggleValue))
  }

  handleSelection (event: any): void {
    this.router.navigate(['/tasks'], { queryParams: { status: event.value } })
    this.tasks = this.taskService.filterTasksByStatus(this.status)
  }
}
