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

@Component({
  selector: 'app-yearchart',
  templateUrl: './yearchart.component.html',
  styleUrls: ['./yearchart.component.css']
})
export class YearchartComponent implements OnInit {
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
  
    
      this._finData.dailyFinance().subscribe(
        res=> {
  
          let alldates = res.map(res => new Date(res.entryDate).toLocaleDateString('en-US', { year:'numeric'}));
          let sales = res.map(res => res.netSales);
          let cost = res.map(res => res.netCosts);
          let difference = res.map(res => res.saleDifference);
          

          var d = new Date,
          dformat : any = 
            d.getFullYear();
      
                //For the netSales
                let ynetsum = 0;
                for (let i = 0; i < res.length; i++)
                {
                  
                  if(alldates[i] == dformat)
                  {
                    ynetsum += res[i].netSales;
                  }
                  localStorage.setItem("yearnetcostss",ynetsum.toString())
                }
                 //For the netCosts
                let ycostsum = 0;
                for (let i = 0; i < res.length; i++)
                {
                  
                  if(alldates[i] == dformat)
                  {
                    ycostsum += res[i].netCosts;
                  }
                  localStorage.setItem("yearnetsaless",ycostsum.toString())
                }

                //For the netDiff
                let ydiffsum = 0;
                for (let i = 0; i < res.length; i++)
                {
                  
                  if(alldates[i] == dformat)
                  {
                    ydiffsum += res[i].saleDifference;
                  }
                  localStorage.setItem("yearnetDiff",ydiffsum.toString())
                }
                
                
        
          var ctx = <HTMLCanvasElement> document.getElementById("canvas2");
          const maxDate = new Date();
          const minDate = maxDate.setDate(maxDate.getDate() - 7);
    
          
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: alldates,
              datasets:[
                
                {
                  data: [localStorage.yearnetcostss],
                  borderColor: '#1976d2',
                  backgroundColor: '#1976d2cc',
                  hoverBackgroundColor:"#4791dba3",
                  hoverBorderColor:"#4791dba3",
                  borderWidth:1,
                  hoverBorderWidth: 3,
                  label:'Gross Income',
                  barThickness: 100,
                  borderRadius:30
                },
                {
                  data: [localStorage.yearnetsaless],
                  borderColor: '#5c5c5c',
                  backgroundColor: '#00000073',
                  borderWidth:1,
                  hoverBackgroundColor:"#333333",
                  hoverBorderColor:"#333333",
                  hoverBorderWidth: 3,
                  label:'Total Costs',
                  pointStyle: 'rectRot',
                  barThickness: 100,
                  borderRadius:30
                },
                {
                  data: [localStorage.yearnetDiff],
                  borderColor: '#5c5c5c',
                  backgroundColor: '#19d249a3',
                  borderWidth:1,
                  hoverBackgroundColor:"#6ce28b73",
                  hoverBorderColor:"#6ce28b73",
                  hoverBorderWidth: 3,
                  label:'Profit',
                  pointStyle: 'rectRot',
                  barThickness: 100,
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
                    unit: 'year'
                    },
                    
                    
                    
                },
                
                y: {
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
      //Logs the returned Filtered data matching the specifc userID in the Database
    };
  }

