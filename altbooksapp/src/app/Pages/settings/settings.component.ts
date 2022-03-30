import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars, faCode } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, animate, style} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
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
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';



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
  [x: string]: any;

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
  faPlus = faPlus;
  faExclamation = faExclamation;
  faBusinessTime = faBusinessTime;

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
  newuserDetails:any;
   
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

  constructor(public Http:HttpClient,public service:UserService,public allservice:SharedService, private router:Router, private formBuilder: FormBuilder, private toastr:ToastrService) { }

  allReplies: any
  finData : any ;
  allUsers : any;
  allFeeds: any;
  makePost: any
  userFeed: any;
  userreplyFeed: any;
  
  ngOnInit(): void {
    this.allservice.getCPFeed().subscribe(feeddata=>{
      this.allFeed = feeddata;

    this.service.getUserProfile().subscribe(data=>{
      this.userDetails = data
      this.userDetails.userPic = this.service.PhotoURL+'/' + this.userDetails.userPic
      
      
      //Logs the returned Filtered data matching the specifc userID in the Database
      console.log("Logged in user information: ", this.userDetails);

      this.allservice.getFeedReply().subscribe(data =>{
        this.allReplies = data;
        let Feeddataid = feeddata.map(feeddata => feeddata.cfId)

        console.log("ourfeed id: ",Feeddataid)
        
        let r = data.map(data => data.parentcommentid)
        
      })
    
  })
})

  this.hideAdmin();

}

isVisible: boolean = true;

hideAdmin(){
  this.service.getUserProfile().subscribe(data=>{
    this.newuserDetails= data;
    const user = this.newuserDetails.userRole;
    
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

///data arrays
userData: any;
edituserData: any;
@Input()
Email:string | undefined;
myUserId: number | undefined;
FullName: string | undefined;
PhoneNumber: string | undefined;
orgName: string | undefined;
userPic: string | undefined;
postMessage: string | undefined;
postImage:string | undefined;
postSubject: string | undefined;
postTime: string | undefined;
postUserPic: string | undefined;



public oneditSubmit = ( files:any) =>
{
   
  this.service.getUserProfile().subscribe(response=>{
    this.edituserData = response;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.Http.post('https://webapi20220126203702.azurewebsites.net/api/ApplicationUser/saveFile',formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      console.log("file name:",fileToUpload.name)
      
      if(event.type === HttpEventType.UploadProgress && event.total != undefined)
      {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'Uploaded Successfully';
        this.onUploadFinished.emit(event.body);

        console.log(this.edituserData.myUserId)
    var editbody={
      Email: this.Email,
      FullName: this.FullName,
      PhoneNumber: this.PhoneNumber,
      orgName: this.orgName,
      myUserId: this.myUserId = this.edituserData.myUserId,
      userPic: this.userPic = fileToUpload.name 
    } 

  this.service.editUserProfile(editbody).subscribe(
    (res:any) =>{
      this.userData =res;
      this.toastr.success('Edited Successfully!');
      this.router.navigate(['/settings']);
    },
    err =>{
      if(err.status == 400)
      this.toastr.error("Failed to edit your profile.", "couldn't edit your profile")
      else
      console.log(err);
    }
  );
  
  console.log(editbody)
      }
    })
    
})
}

onPostReply(value: any){
  this.service.getUserProfile().subscribe(loggeduser=>{
    this.user = loggeduser;
    this.user.userPic
    this.allservice.getCPFeed().subscribe(feeddata=>{
      this.allFeed = feeddata;
      
    var val = {
      commenttext:this.commenttext,
      parentcommentid:value,
      FullName: this.FullName = this.user.fullName,
      postreplyUserPic: this.postUserPic = this.service.PhotoURL+'/'+this.user.userPic

    } 
    this.allservice.postCPReply(val).subscribe(res =>{
      this.userreplyFeed=res;
      return this.userreplyFeed
      
    });
    this.toastr.success("Post Created !")  
    this.allservice.getFeedReply().subscribe(data =>{
      this.allReplies = data;

      
      let r = data.map(data => data.parentcommentid)
     
    })
    this.refreshreplies();
  });
})
}

onpostSubmit(){
  this.service.getUserProfile().subscribe(loggeduser=>{
    this.user = loggeduser;
    this.user.userPic

    var val = {
      postMessage:this.postMessage,
      postImage:this.postImage,
      postSubject: this.postSubject,
      FullName:this.FullName = this.user.fullName,
      postTime: this.postTime = this.newtoday,
      postUserPic: this.postUserPic = this.service.PhotoURL+'/'+this.user.userPic

    } 
    this.allservice.postCPFeed(val).subscribe(postcpdata =>{
      this.userFeed=postcpdata;
      return this.userFeed
      
    });
    this.toastr.success("Post Created !")  
  });
}
//Uploading a file
  public message!: string;
  public progress!: number;
@Output() public onUploadFinished = new EventEmitter();


onLogout(){
  localStorage.removeItem('token');
  this.router.navigate(['/user/login']);
}
}

