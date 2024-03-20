import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Task } from '../task.interface'
import { faBriefcase, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { HTTPService } from '../http.service'

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  constructor (private readonly httpService: HTTPService, private route: ActivatedRoute, private readonly router: Router) {}
  taskItem!: Task
  iconSign: IconDefinition = faBriefcase

  ngOnInit (): void {
    const id = this.route.snapshot.params['id']
    this.httpService.getTaskById(+id)
      .subscribe(task => {
        this.taskItem = task;
      })
  }

  goBack (): void {
    this.router.navigate(['/tasks']);
  
  }
}
