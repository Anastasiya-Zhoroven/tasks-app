import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { Task } from '../task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HTTPService } from '../http.service';
import { TaskFilterParams } from '../task-filter-params';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  toggleValue: boolean = false;
  filterParams: TaskFilterParams = {};
  tasksSubject: Observable<Task[]> = new Observable<Task[]>();
  users: User[] = [];

  protected readonly destroyParamsSubject: Subject<void> = new Subject<void>();

  constructor (private readonly httpService: HTTPService, private readonly userService: UserService, private readonly taskService: TaskService, private readonly router: Router, public route: ActivatedRoute) {
    const storedToggleValue = localStorage.getItem('toggleValue');
    this.toggleValue = storedToggleValue ? JSON.parse(storedToggleValue) : false;
    httpService.getFullTasks();
    route.queryParams.pipe(takeUntil(this.destroyParamsSubject)).subscribe(value => {
      this.filterParams.status = value['status'] || 'all';
    });
    userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit (): void {
    this.tasksSubject = this.taskService.tasksSubject.asObservable();
  }

  ngOnDestroy (): void {
    this.destroyParamsSubject.next();
    this.destroyParamsSubject.complete();
  }

  addTask (): void {
    this.taskService.addTask();
  }

  deleteTask (id: number): void {
    this.taskService.deleteTask(id);
  }

  updateTask (id: number, completed: boolean): void {
    this.taskService.updateTask(id, completed);
  }

  authChanged (): void {
    localStorage.setItem('toggleValue', JSON.stringify(this.toggleValue));
  }

  handleStatusSelection (event: any): void {
    this.router.navigate(['/tasks'], { queryParams: { status: event.value } });
  }

  handleSearch (event: any): void {
    this.filterParams.search = event.value;
  }
}
