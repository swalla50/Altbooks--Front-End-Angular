import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import { trigger, transition, animate, style} from '@angular/animations';

export interface CollapsibleItem { 
  label: string; 
  text: string;
  state: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  ],
  styles: ['']
})
export class HomeComponent implements OnInit {

  faBars = faBars;
  faTimes = faTimes;
  faBriefcase = faBriefcase;
  faPiggyBank = faPiggyBank;
  faMoneyCheck = faMoneyCheck;
  faReceipt = faReceipt;
  faDollarSign = faDollarSign;

  showDiv: boolean = false;
   
  toggleDiv() {
    this.showDiv = this.showDiv? false : true;
  }

  constructor(private service:SharedService) { }

  menuItems: CollapsibleItem[] = [
    { label: 'First', text: 'Lorem Ipsum', state: true }
   ];

    menuClick(clickedItem: number) {
        this.menuItems[clickedItem].state = !this.menuItems[clickedItem].state  // flips the boolean value for the clicked item 
        for (let item of this.menuItems) {  
           if ( item !== this.menuItems[clickedItem] ) { 
               item.state = false; 
           }
        }
        // the for loop goes through the array and sets each item to false *if* its not the item that was clicked
     }   

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
