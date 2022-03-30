import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  faComments = faComments;

  allUsers: any;

  constructor(public allservice: SharedService, public service:UserService) { this.getListofUsers()}

  ngOnInit(): void {
  }

  getListofUsers(){
    this.allservice.getAllUserNames().subscribe(data=>{
      this.allUsers = data;

      for(let i = 0; i < this.allUsers.length; i++){
        this.allUsers[i].userPic = this.service.PhotoURL+'/'+this.allUsers[i].userPic
        console.log(this.allUsers[i].userPic)
      }
      

      console.log(this.allUsers)
     });
  }

}
