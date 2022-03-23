import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FinDataService } from '../fin-data.service';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-sevendaychart',
  templateUrl: './sevendaychart.component.html',
  styleUrls: ['./sevendaychart.component.css']
})
export class SevendaychartComponent implements OnInit {

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
  
          let alldates = res.map(res => new Date(res.entryDate).toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));
          let sales = res.map(res => res.netSales);
          let cost = res.map(res => res.netCosts);
          let difference = res.map(res => res.saleDifference);
          
          // let newdate = new Date(alldates).toLocaleDateString('en-US', {hour12: false})
          
        
          var ctx = <HTMLCanvasElement> document.getElementById("canvas");
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

          // var sctx = <HTMLCanvasElement> document.getElementById("canvas2");    
          
          // this.chart = new Chart(sctx, {
          //   type: 'bar',
          //   data: {
          //     labels: alldates,
          //     datasets:[
                
          //       {
          //         data: sales,
          //         borderColor: '#1976d2',
          //         backgroundColor: '#1976d2cc',
          //         borderWidth:1,
          //         hoverBorderWidth: 3,
          //         label:'Gross Profit',
          //         barThickness: 50,
          //         borderRadius:30
          //       },
          //       {
          //         data: cost,
          //         borderColor: '#5c5c5c',
          //         backgroundColor: '#00000073',
          //         borderWidth:1,
          //         hoverBorderWidth: 3,
          //         label:'Total Costs',
          //         pointStyle: 'rectRot',
          //         barThickness: 50,
          //         borderRadius:30
          //       },
          //       {
          //         data: difference,
          //         borderColor: '#5c5c5c',
          //         backgroundColor: '#19d249a3',
          //         borderWidth:1,
          //         hoverBorderWidth: 3,
          //         label:'Profit',
          //         pointStyle: 'rectRot',
          //         barThickness: 50,
          //         borderRadius:30
          //       },
          //     ]
          //   },
          //   options: {
          //     scales: {
          //       x:{
          //         display: true,
          //         type: 'time',
          //         time:{
          //           unit: 'day'
          //           },
          //           min: minDate,
          //           max: Date.now()
                    
                    
          //       },
                
          //       y: {
          //         display:true,
          //         max: 2000,
          //         min: 0,
          //         ticks: {
                     
          //           stepSize: 500   // minimum will be 0, unless there is a lower value.

          //       }
          //       }
          //     },
          //     plugins: {
          //       legend: {
          //           display: true,
          //           labels: {
          //               color: 'black'
          //           }
          //       }
          //   }    
          //   }
          // })

          const userInfo = res.filter(res => res.orgName === user)
        }
        
      )
        })
      //Logs the returned Filtered data matching the specifc userID in the Database
    };
  }
  

