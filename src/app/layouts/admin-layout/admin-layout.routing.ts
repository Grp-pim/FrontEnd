import { UpdateChapterComponent } from './../../chapter/update-chapter/update-chapter.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';


import { NotificationsComponent } from '../../notifications/notifications.component';
import { UserlistComponent } from 'app/userlist/userlist.component';
import { UpdateuserComponent } from 'app/userlist/updateuser/updateuser.component';
import { ListchapterComponent } from 'app/chapter/listchapter/listchapter.component';
import { AddchapterComponent } from 'app/chapter/addchapter/addchapter.component';
import { GameComponent } from 'app/chapter/game/game.component';
import { TestingComponent } from 'app/testing/testing.component';
import { AddtestingComponent } from 'app/testing/addtesting/addtesting.component';
import { UpdateComponent } from 'app/testing/update/update.component';
import { AddtasksComponent } from 'app/testing/tasks/addtasks/addtasks.component';
import { TasksComponent } from 'app/testing/tasks/tasks.component';
import { UpdateTasksComponent } from 'app/testing/tasks/update-tasks/update-tasks.component';
import { AddTaskComponent } from 'app/chapter/task/add-task/add-task.component';
import { ListtaksComponent } from 'app/chapter/task/listtaks/listtaks.component';
import { AddQuizComponent } from 'app/chapter/quiz/add-quiz/add-quiz.component';
import { GrafanaComponent } from 'app/chapter/quiz/grafana/grafana.component';
import { ListQuizComponent } from 'app/chapter/quiz/list-quiz/list-quiz.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'table-users', component: UserlistComponent },
    { path: 'chapter-list', component: ListchapterComponent },
    {
        path: 'add-chapter', component: AddchapterComponent,
    },
    {
        path: "game",
        component: GameComponent,

    },
    { path: 'updateuser/:id', component: UpdateuserComponent },




    { path: 'notifications', component: NotificationsComponent },
    {
        path: 'test',
        component: TestingComponent,
    },
    {
        path: 'addtest',
        component: AddtestingComponent,
    },
    {
        path: 'updatetest/:id',
        component: UpdateComponent
    },
    {
        path:'addTask/:id',
        component:AddtasksComponent
    }
    ,{
        path:'Tasks/:id',
        component:TasksComponent
    },
    {
        path:'updateTaks/:id',
        component:UpdateTasksComponent
    },
    {
        path:'updateChapters/:id',
        component:UpdateChapterComponent
    },
    {
        path:'addChapterTask/:id',
        component:AddTaskComponent
    },
    {
        path:'listTasks/:id',
        component:ListtaksComponent
    },
    {
        path:'AjoutQuiz/:id',
        component:AddQuizComponent
    },
    {
        path:'Quiz/:id',
        component:ListQuizComponent
    }

];
