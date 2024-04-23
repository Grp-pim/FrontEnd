import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserlistComponent } from './userlist/userlist.component';
import {MatButtonModule} from '@angular/material/button';
import { UpdateuserComponent } from './userlist/updateuser/updateuser.component';
import { ListchapterComponent } from './chapter/listchapter/listchapter.component';
import { AddchapterComponent } from './chapter/addchapter/addchapter.component';
import { GameComponent } from './chapter/game/game.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {ChartModule} from 'primeng/chart';
import { TestingComponent } from './testing/testing.component';
import { AddtestingComponent } from './testing/addtesting/addtesting.component';
import { UpdateComponent } from './testing/update/update.component';
import { TasksComponent } from './testing/tasks/tasks.component';
import { AddtasksComponent } from './testing/tasks/addtasks/addtasks.component';
import { UpdateTasksComponent } from './testing/tasks/update-tasks/update-tasks.component';
import { AddquizComponent } from './testing/quiz/addquiz/addquiz.component';
import { UpdateChapterComponent } from './chapter/update-chapter/update-chapter.component';
import { AddTaskComponent } from './chapter/task/add-task/add-task.component';
import { ListtaksComponent } from './chapter/task/listtaks/listtaks.component';
import { AddQuizComponent } from './chapter/quiz/add-quiz/add-quiz.component';
import { GrafanaComponent } from './chapter/quiz/grafana/grafana.component';
import { ListQuizComponent } from './chapter/quiz/list-quiz/list-quiz.component';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule, 
    AccordionModule,
    ChartModule,ChipsModule
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserlistComponent,
    UpdateuserComponent,
    ListchapterComponent,
    AddchapterComponent,
    GameComponent,
    TestingComponent,
    AddtestingComponent,
    UpdateComponent,
    TasksComponent,
    AddtasksComponent,
    UpdateTasksComponent,
    AddquizComponent,
    UpdateChapterComponent,
    AddTaskComponent,
    ListtaksComponent,
    AddQuizComponent,
    GrafanaComponent,
    ListQuizComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
