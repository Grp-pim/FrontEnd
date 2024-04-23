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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPwdComponent },
  { path: 'resetPassword/:token', component: ResetPwdComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'homeStepper', component: HomeStepperComponent },
  { path: 'events', component: EventsComponent },
  { path: 'community', component: CommunityComponent },

  { path: 'test/:id', title: 'exam', component: TestPageComponent, canActivate: [TestExistsGuard] },
  { path: 'quizTest/:id', title: 'exam', component: QuizPageComponent, canActivate: [TestExistsGuard] },
  { path: 'quiz', title: 'Quiz', component: QuizPageComponent },
  { path: 'compilator', title: 'Comp', component: BodyComponent },
  { path: 'test', title: 'Test', component: CreateTestComponent },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
