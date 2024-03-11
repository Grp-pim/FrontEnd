import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CreateTestComponent } from './create-test/create-test.component';

const routes: Routes = [
  { path: 'compilator', title: 'Comp', component: BodyComponent },
  { path: 'test', title: 'Test', component: CreateTestComponent },
  { path: '', redirectTo:'/test', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
