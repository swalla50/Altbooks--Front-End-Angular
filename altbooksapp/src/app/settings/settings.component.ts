import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars, faCode } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, animate, style} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export interface CollapsibleItem { 
  label: string; 
  text: string;
  state: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateX(-100%'}),
        animate('100ms')
      ]),
      transition('* => void', [
        animate('100ms', style({transform: 'translateX(-100%)'}))
      ])
  ]),
  trigger('slideInOut', [
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
export class SettingsComponent implements OnInit {

  faBars = faBars;
  faTimes = faTimes;
  faBriefcase = faBriefcase;
  faPiggyBank = faPiggyBank;
  faMoneyCheck = faMoneyCheck;
  faReceipt = faReceipt;
  faDollarSign = faDollarSign;
  faBuilding = faBuilding;
  faUserCog = faUserCog;
  faUserPlus = faUserPlus;
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;

  public isVisited = false;

  public checkVisited() {
    // reverse the value of property
    this.isVisited = !this.isVisited;
 }
 
  registerForm!: FormGroup;
  submitted = false;
  get f() { return this.registerForm.controls; }

  showDiv: boolean = false;
  userDetails: any;
   
  toggleDiv() {
    this.showDiv = this.showDiv? false : true;
  }

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

  constructor(public service:UserService, private router:Router, private formBuilder: FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      });

    this.service.getUserProfile().subscribe(data=>{
      this.userDetails = data
    
      
      
      //Logs the returned Filtered data matching the specifc userID in the Database
      console.log("Logged in user information: ", this.userDetails);
  });

  this.hideAdmin();

}

isVisible: boolean = true;

hideAdmin(){
  this.service.getUserProfile().subscribe(data=>{
    this.userDetails= data;
    const user = this.userDetails.userRole;
    
    if (user === "User")
     {
       this.isVisible = false;
     }
     if (user === "Admin")
     {
       this.isVisible = true;
     }
  });
}

feedItems: CollapsibleItem[] = [
  { label: 'First', text: 'Lorem Ipsum', state: true }
 ];

  feedClick(feedItem: number) {
      this.feedItems[feedItem].state = !this.feedItems[feedItem].state  // flips the boolean value for the clicked item 
      for (let item of this.feedItems) {  
         if ( item !== this.feedItems[feedItem] ) { 
             item.state = true; 
         }
      }
      // the for loop goes through the array and sets each item to false *if* its not the item that was clicked
   }
onSubmit(){
  this.service.register().subscribe(
    (res:any) => {
      if(res.succeeded){
        this.service.formModel.reset();
        this.toastr.success('New user created!', 'Registration sucessful.')
      } else{
        res.errors.forEach((element: { code: any; }) => {
          switch(element.code){
            case'DuplicateUserName' :
            this.toastr.error('Username is already taken', 'Registration failed.');
            break;
            default:
              this.toastr.error('Registration failed.');
            break;
          }
          
        });
      }
    },
    err =>{
      console.log(err);
    }
  );
}
onLogout(){
  localStorage.removeItem('token');
  this.router.navigate(['/user/login']);
}
}

