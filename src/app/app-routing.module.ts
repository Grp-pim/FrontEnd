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

const routes: Routes = [
  { path: '', title: 'home', component: HomeComponent },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'signup', title: 'signup', component: SignupComponent },
  { path: 'forgotPassword', title: 'forgot Password', component: ForgotPwdComponent },
  { path: 'resetPassword/:token', title: 'reset Password', component: ResetPwdComponent },
  { path: 'profile', title: 'profile', component: ProfileComponent },
  { path: 'homeStepper', title: 'Map', component: HomeStepperComponent },
  { path: 'events', title: 'events', component: EventsComponent },
  { path: 'community', title: 'community', component: CommunityComponent },
  { path: 'select-role', title: 'select role google', component: SelectRoleComponent },
  { path: 'dashboard/Teacher', title: 'dashboard Teacher', component: DashboardTeacherComponent },
  { path: 'dashboard/Admin', title: 'dashboard Admin', component: DashboardComponent },

  { path: 'test/:id', title: 'exam', component: TestPageComponent, canActivate: [TestExistsGuard] },
  { path: 'quizTest/:id', title: 'exam', component: QuizPageComponent, canActivate: [TestExistsGuard] },
  { path: 'quiz', title: 'Quiz', component: QuizPageComponent },
  // { path: 'compilator', title: 'Comp', component: BodyComponent },
  { path: 'compilator/:chapterNumber', title: 'compilator', component: BodyComponent },
  { path: 'test', title: 'Test', component: CreateTestComponent },
  { path: 'test-details/:id', title: 'Test-details', component: TestDetailsComponent },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
