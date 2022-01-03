import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserListComponent } from './user-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [UserListComponent],
  exports: [UserListComponent]
})
export class UserListComponentModule {}
