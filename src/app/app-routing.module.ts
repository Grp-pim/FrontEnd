import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' }, //default
  { path: 'compilator/:_id', title: 'Comp', component: BodyComponent },
  { path: 'test', title: 'Test', component: CreateTestComponent },
  { path: '**', title: 'notFound', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
