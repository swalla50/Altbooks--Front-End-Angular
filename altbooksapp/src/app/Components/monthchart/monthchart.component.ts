import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { FinDataService } from 'src/app/fin-data.service';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables} from 'chart.js';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-monthchart',
  templateUrl: './monthchart.component.html',
  styleUrls: ['./monthchart.component.css']
})
export class MonthchartComponent implements OnInit {
  allReplies: any
  finData : any ;
  allUsers : any;
  allFeeds: any;
  makePost: any
  userFeed: any;
  userreplyFeed: any;
  userDetails: any;
  allFeed: any;
  user: any;
  chart = <any>[];

  constructor(public service:UserService, private router:Router, private _finData: FinDataService, public allservice:SharedService, private toastr: ToastrService ) {
    Chart.register(...registerables)
   }

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
  
          let alldates = res.map(res => new Date(res.entryDate).toLocaleDateString('en-US', {month:'numeric', year:'numeric'}));
          const currmonth = new Date()
          let thismonth = currmonth.toLocaleString('en-US', { month: 'long' })
          let sales = res.map(res => res.netSales);
          let cost = res.map(res => res.netCosts);
          let difference = res.map(res => res.saleDifference);
          let stringdates = res.map(res => new Date(res.entryDate).toString());
          var d = new Date,
    dformat : any = [d.getMonth(),
      d.getFullYear(),].join('/');

          //For the netSales
          let netsum = 0;
          for (let i = 0; i < res.length; i++)
          {
            
            if(alldates[i] == dformat)
            {
              netsum += res[i].netSales;
            }
            localStorage.setItem("netcostss",netsum.toString())
          }
          

           //For the netCosts
           let costsum = 0;
           for (let i = 0; i < res.length; i++)
           {
             
             if(alldates[i] == dformat)
             {
               costsum += res[i].netCosts;
             }
             localStorage.setItem("netsaless",costsum.toString())
           }

           //For the netDiff
           let diffsum = 0;
           for (let i = 0; i < res.length; i++)
           {
             
             if(alldates[i] == dformat)
             {
               diffsum += res[i].saleDifference;
             }
             localStorage.setItem("netDiff",diffsum.toString())
           }
           
        
          var ctx = <HTMLCanvasElement> document.getElementById("canvas1");
          const maxDate = new Date();
          const minDate = maxDate.setDate(maxDate.getDate() - 7);
    
          
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [thismonth],
              datasets:[
                
                {
                  data: [localStorage.netcostss],
                  borderColor: '#1976d2',
                  backgroundColor: '#1976d2cc',
                  borderWidth:1,
                  hoverBorderWidth: 3,
                  label:'Gross Profit',
                  barThickness: 50,
                  borderRadius:30
                },
                {
                  data: [localStorage.netsaless],
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
                  data: [localStorage.netDiff],
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
                  display: true
                    
                    
                    
                },
                
                y: {
                  beginAtZero: true,
                  display:true,
                  max: 4000,
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
        }
        
      )
        })
      //Logs the returned Filtered data matching the specifc userID in the Database
    };
  }


