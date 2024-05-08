import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TestPageComponent } from './test-page/test-page.component';
import { TestExistsGuard } from './test-exists.guard';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeStepperComponent } from './components/home-stepper/home-stepper.component';
import { EventsComponent } from './components/events/events.component';
import { CommunityComponent } from './components/community/community.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { DashboardComponent } from './components/admin-folder/dashboard/dashboard.component';
import { RoleGuardGuard } from './services/role_guard/role-guard.guard';

const routes: Routes = [
  { path: '', title: 'home', component: HomeComponent },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'signup', title: 'signup', component: SignupComponent },
  { path: 'forgotPassword', title: 'forgot Password', component: ForgotPwdComponent },
  { path: 'resetPassword/:token', title: 'reset Password', component: ResetPwdComponent },
  { path: 'profile', title: 'profile', component: ProfileComponent, canActivate: [RoleGuardGuard], data: { role: ['Admin', 'Student', 'Teacher'] } },
  { path: 'homeStepper', title: 'Map', component: HomeStepperComponent, canActivate: [RoleGuardGuard], data: { role: 'Student' }  },
  { path: 'events', title: 'events', component: EventsComponent, canActivate: [RoleGuardGuard], data: { role: ['Admin', 'Student', 'Teacher'] } },
  { path: 'community', title: 'community', component: CommunityComponent, canActivate: [RoleGuardGuard], data: { role: ['Admin', 'Student', 'Teacher'] } },
  { path: 'select-role', title: 'select role google', component: SelectRoleComponent },
  { path: 'dashboard/Teacher', title: 'dashboard Teacher', component: DashboardTeacherComponent, canActivate: [RoleGuardGuard], data: { role: 'Teacher' } },
  { path: 'dashboard/Admin', title: 'dashboard Admin', component: DashboardComponent, canActivate: [RoleGuardGuard], data: { role: 'Admin' } },

  { path: 'test/:id', title: 'exam', component: TestPageComponent, canActivate: [TestExistsGuard, RoleGuardGuard], data: { role: ['Student', 'Teacher'] } },
  { path: 'quizTest/:id', title: 'exam', component: QuizPageComponent, canActivate: [TestExistsGuard, RoleGuardGuard], data: { role: ['Student', 'Teacher'] } },
  { path: 'quiz', title: 'Quiz', component: QuizPageComponent, canActivate: [RoleGuardGuard], data: { role: ['Student', 'Teacher'] } },
  // { path: 'compilator', title: 'Comp', component: BodyComponent },
  { path: 'compilator/:chapterNumber', title: 'compilator', component: BodyComponent, canActivate: [RoleGuardGuard], data: { role: 'Student' } },
  { path: 'test', title: 'Test', component: CreateTestComponent, canActivate: [RoleGuardGuard], data: { role: 'Teacher' } },
  { path: 'test-details/:id', title: 'Test-details', component: TestDetailsComponent, canActivate: [RoleGuardGuard], data: { role: 'Teacher' } },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
