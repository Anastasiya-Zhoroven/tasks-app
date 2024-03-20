import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Task } from '../task.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform (tasks: Task[] | null, searchText?: string): Observable<Task[]> {
    if (!tasks) {
      return of([]);
    }

    if (!searchText || searchText.trim() === '') {
      return of(tasks);
    }

    return of(tasks).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      map(filteredTasks => {
        return filteredTasks.filter(task => {
          const titleMatch = task.title.toLowerCase().includes(searchText.toLowerCase());
          const userMatch = task.user?.name.toLowerCase().includes(searchText.toLowerCase());
          return titleMatch || userMatch;
        });
      })
    );
  }
}
