import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
