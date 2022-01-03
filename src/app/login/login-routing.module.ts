import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    // FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
