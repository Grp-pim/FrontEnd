import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TestPageComponent } from './test-page/test-page.component';
import { TestExistsGuard } from './test-exists.guard';

const routes: Routes = [
  {
    path: 'test/:id',
    title: 'exam',
    component: TestPageComponent,
    canActivate: [TestExistsGuard],
  },
  { path: 'body/chapter/:chapterNumber', component: BodyComponent },
  // Ajoutez d'autres routes au besoin
  { path: '', redirectTo: '/body/chapter/1', pathMatch: 'full' },
  // { path: 'compilator/:_id', title: 'Comp', component: BodyComponent },
  //{ path: '', redirectTo: '/test', pathMatch: 'full' }, //default
  // Redirection par défaut vers le premier chapitre
  //{ path: 'test', title: 'Test', component: CreateTestComponent },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
