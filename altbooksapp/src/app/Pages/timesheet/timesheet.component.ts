import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { faBars, faCode } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables} from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';



import { trigger, transition, animate, style} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { FinDataService } from 'src/app/fin-data.service';
import 'chartjs-adapter-moment';
import * as moment from 'moment';

declare var $: any;

export interface CollapsibleItem { 
  label: string; 
  text: string;
  state: boolean;
}


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  chart = <any>[];

  userDetails: any;
  allFeed: any;
  user: any;
  timelist: any;
  paylist: any;

  faBars = faBars;
  faTimes = faTimes;
  faBriefcase = faBriefcase;
  faPiggyBank = faPiggyBank;
  faMoneyCheck = faMoneyCheck;
  faReceipt = faReceipt;
  faDollarSign = faDollarSign;
  faCogs = faCogs;
  faCaretLeft =faCaretLeft;
  faCaretRight = faCaretRight;
  faPlus = faPlus;
  faCreditCard = faCreditCard;
  faExclamation = faExclamation;
  faClock = faClock;
  faPencilAlt = faPencilAlt;
  faPlusCircle = faPlusCircle;
  faCheckCircle = faCheckCircle;
  faUserClock =faUserClock;
  faTimesCircle =faTimesCircle;
  faBusinessTime =faBusinessTime;

  public isVisited = false;
  newuserDetails: any;

  public checkVisited() {
    // reverse the value of property
    this.isVisited = !this.isVisited;
 }
 

  
  showDiv: boolean = false;
  newfeedpost: any;
  public response!: { dbPath: '' };
  allReplies: any
  finData : any ;
  allUsers : any;
  allFeeds: any;
  makePost: any
  userFeed: any;
  userreplyFeed: any;
  userTimeAdd :any;
  toggleDiv() {
    this.showDiv = this.showDiv? false : true;
  }
  @Input() 
    
    postMessage: string | undefined;
    postImage:string | undefined;
    FullName: string | undefined;
    postSubject: string | undefined;
    postTime: string | undefined;
    postUserPic: string | undefined;


  constructor(public service:UserService, private router:Router, private _finData: FinDataService, public allservice:SharedService, private toastr: ToastrService) { 
    Chart.register(...registerables)
  }
  isEditing: boolean = false;
  enableEditIndex = null;
  i: any;
  switchEditMode(i: any) {
    this.isEditing = true;
    this.enableEditIndex = i;
  }

  save() {
    this.isEditing = false;
    this.enableEditIndex = null;
  }

  cancel() {
    this.isEditing = false;
    this.enableEditIndex = null;
  }
  
   reload(value:any){
     
    var container = document.getElementById(value);
    if(container != null){
    var content = container.innerHTML;
    container.innerHTML= content; 
    
   //this line is to watch the result in console , you can remove it later	
    console.log("Refreshed"); 
    }
}

  public createImgPath =(serverPath: string) => {
    return`https://webapi20220126203702.azurewebsites.net/${serverPath}`;
  }
  //Upload property
  public uploadFinished = (event: { dbPath: ""; }) =>
  {
    this.response = event;
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
     feedItems: CollapsibleItem[] = [
      { label: 'First', text: 'Lorem Ipsum', state: true }
     ];
  
      feedClick(feedItem: number) {
          this.feedItems[feedItem].state = !this.feedItems[feedItem].state  // flips the boolean value for the clicked item 
          for (let item of this.feedItems) {  
             if ( item !== this.feedItems[feedItem] ) { 
                 item.state = false; 
             }
          }
          // the for loop goes through the array and sets each item to false *if* its not the item that was clicked
       }
       today = new Date();
      dd = String(this.today.getDate()).padStart(2, '0');
      mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = this.today.getFullYear();

       newtoday = this.mm + '/' + this.dd + '/' + this.yyyy;
       
       
       onSubmit(){
        this.service.getUserProfile().subscribe(loggeduser=>{
          this.user = loggeduser;
          this.user.userPic
          console.log("post User pic", this.user.userPic)

          var val = {
            postMessage:this.postMessage,
            postImage:this.postImage,
            postSubject: this.postSubject,
            FullName:this.FullName = this.user.fullName,
            postTime: this.postTime = this.newtoday,
            postUserPic: this.postUserPic = this.service.PhotoURL+'/'+this.user.userPic

          } 
          this.allservice.postCPFeed(val).subscribe(res =>{
            this.userFeed=res;
            console.log("User feed with image:",this.userFeed.postUserPic)
            return this.userFeed
            
          });
          this.toastr.success("Post Created !")  
        });
      }

      

      @Input()
      commenttext: string | undefined;
      parentcommentid!: number;
      postreplyUserPic: string | undefined;
      fullName: string | undefined;
      timeworkedIn: string | undefined ;
      timeworkedOut: string | undefined;
      payperHour: number | undefined;
      myUserId: number | undefined;
      sheetId: number | undefined;

      //Date format for display
      formatsDateTest: string[] = [
        'dd/MM/yyyy',
        'dd/MM/yyyy hh:mm:ss',
        'dd-MM-yyyy',
        'dd-MM-yyyy HH:mm:ss',
        'MM/dd/yyyy',
        'MM/dd/yyyy hh:mm:ss',
        'yyyy/MM/dd',
        'yyyy/MM/dd HH:mm:ss',
        'dd/MM/yy',
        'dd/MM/yy hh:mm:ss',
        ];
    
      dateNow : Date = new Date();
      dateNowISO = this.dateNow.toISOString();
      dateNowMilliseconds = this.dateNow.getTime();

      

      onPostReply(value: any){
        this.service.getUserProfile().subscribe(loggeduser=>{
          this.user = loggeduser;
          this.user.userPic
          console.log("post User pic", this.user.userPic)
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
            console.log("User feed with image:",this.userreplyFeed.postreplyUserPic)
            return this.userreplyFeed
            
          });
          this.toastr.success("Post Created !")  
        });
      })
      }
      
      
      onaddTime(){
        this.service.getUserProfile().subscribe(loggeduser=>{
          this.user = loggeduser;
          var date;

          var timeval = {
            fullName:this.fullName = this.user.fullName,
            timeworkedIn: this.timeworkedIn = moment().format('YYYY-MM-DDTHH:mm:ss'),
            timeworkedOut: this.timeworkedOut,
            payperHour: this.payperHour = this.user.payperHour,
            myUserId: this.myUserId = this.user.myUserId

          } 
          this.allservice.postTimeSheet(timeval).subscribe(newdataTime =>{
            this.userTimeAdd=newdataTime;

            console.log("this is the value1:", timeval)

            console.log("Time added:", this.userTimeAdd)
            return this.userTimeAdd
          });
          console.log("this is the value2:",timeval)

          this.toastr.success("Added Time!")  
      
      })
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
      

      onquickupdate(value: any){
        
        var timeval = {
          sheetId: this.sheetId = value,
          timeworkedOut: this.timeworkedOut = moment().format('YYYY-MM-DDTHH:mm:ss'),
        } 
        this.allservice.quickupdateOut(timeval).subscribe(
          (res:any) =>{
            this.userTimeAdd = res;
            
            this.toastr.success('Clocked-out!');
            this.router.navigate(['/timesheet']);
          },
          err =>{
            if(err.status == 400)
            this.toastr.error('Failed to update time.', 'Time update failed.')
            else
            console.log(err);
          });
        console.log(timeval)
      }
      onupdateTime(value: any,inval: any,outval: any){
        this.service.getUserProfile().subscribe(loggeduser=>{
          this.user = loggeduser;
          var date;
          date = new Date();
          date = date.getUTCFullYear() + '-' +
              ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
              ('00' + date.getUTCDate()).slice(-2) + 'T' + 
              ('00' + date.getUTCHours()).slice(-2) + ':' + 
              ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
              ('00' + date.getUTCSeconds()).slice(-2);
          
          var timeval = {
            sheetId: this.sheetId = value,
            timeworkedIn: this.timeworkedIn = inval,
            timeworkedOut: this.timeworkedOut = outval,
          } 
          this.allservice.updateTimeSheet(timeval).subscribe(
            (res:any) =>{
              this.userTimeAdd = res;
              
              this.toastr.success('Updated Time!');
              this.router.navigate(['/timesheet']);
            },
            err =>{
              if(err.status == 400)
              this.toastr.error('Failed to update time.', 'Time update failed.')
              else
              console.log(err);
            });
      })
    }

      userPic:any ;
      matchingid: any
  ngOnInit(): void {

    this.hideAdmin();
    this.allservice.getCPFeed().subscribe(feeddata=>{
      this.allFeed = feeddata;
      console.log('datenow',moment().format('YYYY-MM-DDThh:mm:ss'))
      console.log("Company Feed: ", this.allFeed)

      this.allservice.getFeedReply().subscribe(data =>{
        this.allReplies = data;
        let Feeddataid = feeddata.map(feeddata => feeddata.cfId)

        console.log("ourfeed id: ",Feeddataid)
        
        let r = data.map(data => data.parentcommentid)
        console.log("feed parents", this.allReplies)
        console.log("feedId:", r)
        console.log("All of the replies", this.allReplies)
      })
     });
    
    
    
    this.allservice.getAllUserNames().subscribe(data=>{
      this.allUsers = data;
      let alluserid = data.map(data => data.myUserId)

      
      console.log("all users: ", this.allUsers) 
     });

    this.service.getUserProfile().subscribe(data=>{
      this.userDetails = data;

      this.userDetails.userPic = this.service.PhotoURL+'/'+this.userDetails.userPic
      
      console.log("user pic: ",this.userDetails.userPic)

      this.allservice.getTimeSheet().subscribe(payrolldata =>{
        this.timelist = payrolldata;
        let timeTimeworked = payrolldata.map(payrolldata => payrolldata.timeWorked)
        console.log("timelist:", this.timelist)
        let timeuserid = payrolldata.map(payrolldata => payrolldata.myUserId)

         
          payrolldata.forEach(element =>{
            if (element.myUserId == this.userDetails.myUserId){
              console.log("mathing id", element.myUserId)
               this.matchingid= element
            }

            console.log("matching element:",this.matchingid)
            return element
          })
          
        
      })

  
      const user = this.userDetails.orgName;
      this._finData.dailyFinance().subscribe(
        res=> {
  
          let alldates = res.map(res => new Date(res.entryDate).toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));
          let sales = res.map(res => res.netSales);
          let cost = res.map(res => res.netCosts);
          let difference = res.map(res => res.saleDifference);
          
          // let newdate = new Date(alldates).toLocaleDateString('en-US', {hour12: false})
          
          console.log("newdate: ", difference)
        
          const ctx = 'canvas';
          const maxDate = new Date();
          const minDate = maxDate.setDate(maxDate.getDate() - 7);
    
          
          

          const userInfo = res.filter(res => res.orgName === user)
            console.log("This is the financial data: ", userInfo);
        }
        
      )
      console.log("Logged in user information: ", data); 
        })
      //Logs the returned Filtered data matching the specifc userID in the Database
    };
    

  
  




  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
