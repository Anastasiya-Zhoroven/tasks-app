import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'
import { Task } from './task.interface'
import { TaskService } from './task.service'
import { User } from './user.interface'
import { UserService } from './user.service'


@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  private apiTasksList = 'https://jsonplaceholder.typicode.com/todos'

  constructor (private http: HttpClient, private readonly taskService: TaskService, private readonly userService: UserService) {  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiTasksList)
  }

  getFullTasks(): void {
    const obs1 = this.getTasks();
    const obs2 = this.userService.getUsers()

    forkJoin([obs1, obs2]).pipe(
      map(
        ([tasks, users]) => {
          const usersMapping = users.reduce((result, user) => {
            result[user.id] = user
            return result
          }, {}  as { [key: number]: User })
    
          return tasks.map(task => {
            task.user = usersMapping[task.userId]
            return task
          })
        }
      )
    ).subscribe(
      tasks => this.taskService.setTasks(tasks)
    )
  }

  getTaskById (id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiTasksList}/${id}`);
  }
}
