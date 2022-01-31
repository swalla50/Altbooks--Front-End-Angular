import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

import { trigger, transition, animate, style} from '@angular/animations';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateX(-100%'}),
        animate('100ms')
      ]),
      transition('* => void', [
        animate('100ms', style({transform: 'translateX(-100%)'}))
      ])
  ])
  ]
})
export class ShowUserComponent implements OnInit {
  

  faBars = faBars;
  faBriefcase = faBriefcase;
  faPiggyBank = faPiggyBank;
  faMoneyCheck = faMoneyCheck;
  faReceipt = faReceipt;

  showDiv: boolean = true;
   
  toggleDiv() {
    this.showDiv = this.showDiv? false : true;
  }

  constructor(private service:SharedService) { }

  UserList:any = [];

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(){
    this.service.getUserList().subscribe(data=>{
      this.UserList = data.filter(data => data.UserId === 1);
      
      //Logs the returned Filtered data matching the specifc userID in the Database
      console.log("Logged in user information: ", this.UserList);
    });
  }

}
