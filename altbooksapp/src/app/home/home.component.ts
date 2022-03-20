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
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';



import { trigger, transition, animate, style} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FinDataService } from '../fin-data.service';
import 'chartjs-adapter-moment';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
export class HomeComponent implements OnInit {
  
 

  chart = <any>[];

  userDetails: any;
  allFeed: any;
  user: any;

  faBars = faBars;
  faTimes = faTimes;
  faBriefcase = faBriefcase;
  faPiggyBank = faPiggyBank;
  faMoneyCheck = faMoneyCheck;
  faReceipt = faReceipt;
  faDollarSign = faDollarSign;
  faCogs = faCogs;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faPlus = faPlus;
  faBusinessTime = faBusinessTime;
  faExclamation = faExclamation;
  

  public isVisited = false;

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
  public createImgPath =(serverPath: string) => {
    return`http://localhost:5000/${serverPath}`;
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

            return this.userFeed
            
          });
          this.toastr.success("Post Created !")  
        });
      }

      

      @Input()
      commenttext: string | undefined;
      parentcommentid!: number;
      postreplyUserPic: string | undefined;
      

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
        });
      })
      }
      userPic:any ;
  ngOnInit(): void {
      while(localStorage.justOnce === 'false')
      {
        localStorage.setItem ('justOnce','true')
        window.location.reload()
        console.log("whole loal:", localStorage)
      }
  
    this.allservice.getCPFeed().subscribe(feeddata=>{
      this.allFeed = feeddata;

      
     

      this.allservice.getFeedReply().subscribe(data =>{
        this.allReplies = data;
        let Feeddataid = feeddata.map(feeddata => feeddata.cfId)

        
        let r = data.map(data => data.parentcommentid)
       
      })
     });
    
    
    
    this.allservice.getAllUserNames().subscribe(data=>{
      this.allUsers = data;
     });

    this.service.getUserProfile().subscribe(data=>{
      this.userDetails = data;

      this.userDetails.userPic = this.service.PhotoURL+'/'+this.userDetails.userPic
      

  
      const user = this.userDetails.orgName;
      this._finData.dailyFinance().subscribe(
        res=> {
  
          let alldates = res.map(res => new Date(res.entryDate).toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));
          let sales = res.map(res => res.netSales);
          let cost = res.map(res => res.netCosts);
          let difference = res.map(res => res.saleDifference);
          
          // let newdate = new Date(alldates).toLocaleDateString('en-US', {hour12: false})
          
        
          const ctx = 'canvas';
          const maxDate = new Date();
          const minDate = maxDate.setDate(maxDate.getDate() - 7);
    
          
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: alldates,
              datasets:[
                
                {
                  data: sales,
                  borderColor: '#1976d2',
                  backgroundColor: '#1976d2cc',
                  borderWidth:1,
                  hoverBorderWidth: 3,
                  label:'Gross Profit',
                  barThickness: 50,
                  borderRadius:30
                },
                {
                  data: cost,
                  borderColor: '#5c5c5c',
                  backgroundColor: '#00000073',
                  borderWidth:1,
                  hoverBorderWidth: 3,
                  label:'Total Costs',
                  pointStyle: 'rectRot',
                  barThickness: 50,
                  borderRadius:30
                },
                {
                  data: difference,
                  borderColor: '#5c5c5c',
                  backgroundColor: '#19d249a3',
                  borderWidth:1,
                  hoverBorderWidth: 3,
                  label:'Profit',
                  pointStyle: 'rectRot',
                  barThickness: 50,
                  borderRadius:30
                },
              ]
            },
            options: {
              scales: {
                x:{
                  display: true,
                  type: 'time',
                  time:{
                    unit: 'day'
                    },
                    min: minDate,
                    max: Date.now()
                    
                    
                },
                
                y: {
                  display:true,
                  max: 2000,
                  min: 0,
                  ticks: {
                     
                    stepSize: 500   // minimum will be 0, unless there is a lower value.

                }
                }
              },
              plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'black'
                    }
                }
            }    
            }
          })

          const userInfo = res.filter(res => res.orgName === user)
        }
        
      )
        })
      //Logs the returned Filtered data matching the specifc userID in the Database
    };
    

  
  




  onLogout(){
    localStorage.removeItem('token');
    localStorage.setItem('justOnce', 'false');
    this.router.navigate(['/user/login']);
    console.log("just once: ",localStorage.justOnce)
  }

  refreshreplies(){
    this.allservice.getFeedReply().subscribe(data =>{
      this.allReplies = data;

      
      let r = data.map(data => data.parentcommentid)
     
    })
  }
}
