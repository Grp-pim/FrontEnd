import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TestPageComponent } from './test-page/test-page.component';
import { TestExistsGuard } from './test-exists.guard';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: 'test/:id',
    title: 'exam',
    component: TestPageComponent,
    canActivate: [TestExistsGuard],
  },
  {
    path: 'quizTest/:id',
    title: 'exam',
    component: QuizPageComponent,
    canActivate: [TestExistsGuard],
  },
  { path: 'quiz', title: 'Quiz', component: QuizPageComponent },
  { path: 'compilator', title: 'Comp', component: BodyComponent },
  // { path: '', redirectTo: '/test', pathMatch: 'full' }, //default
  { path: 'test', title: 'Test', component: CreateTestComponent },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
