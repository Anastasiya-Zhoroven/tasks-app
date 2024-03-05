import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TaskComponent } from './tasks-list/task/task.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Page404Component } from './page404/page404.component'
import { TasksListComponent } from './tasks-list/tasks-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { TaskCardComponent } from './task-card/task-card.component'
import { AuthGuard } from './auth.guard'
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { JsonPipe } from '@angular/common'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    Page404Component,
    TasksListComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
