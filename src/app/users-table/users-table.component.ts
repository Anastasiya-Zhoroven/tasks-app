import { Component, Input } from '@angular/core';
import { User } from '../user.interface'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input() users!: User[]
}
