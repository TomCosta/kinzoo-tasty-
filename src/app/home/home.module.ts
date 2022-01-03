import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { UserListComponentModule } from '../user-list/user-list.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    IonicModule,
    UserListComponentModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
