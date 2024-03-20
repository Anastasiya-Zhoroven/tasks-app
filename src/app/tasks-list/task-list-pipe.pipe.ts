import { Pipe, PipeTransform } from '@angular/core';
import { TaskFilterParams } from '../task-filter-params';
import { Task } from '../task.interface';

@Pipe({
  name: 'taskListPipe'
})
export class TaskListPipe implements PipeTransform {

  transform(tasks: Task[] | null, status?: string, userId?: number, sortBy?: '' | 'userId' | 'completed'): Task[] {
    if (!tasks) {
      return [];
    }

    if (status && ['completed', 'uncompleted'].includes(status)) {
      const statusB = status === 'completed'
      tasks = tasks.filter(task => task.completed === statusB);
    }

    if (userId) {
      const userIdChosen: number = userId
      tasks = tasks.filter(task => task.userId === userIdChosen);
    }

    if (sortBy) {
      tasks = tasks.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    return tasks;
  }

}
