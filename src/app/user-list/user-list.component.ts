import { UserStatusService } from '../services/user-status/user-status.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  @Input() user: User;
  @Input() uid;
  status$;

  constructor(
    private userStatus: UserStatusService,
  ){    
  }

  ngOnInit() {
    this.status$ = this.userStatus.getStatus(this.uid);
    // this.status$.subscribe((sts)=>{
    //   console.log('My Status: ', sts.status);
    // });
  }

}
