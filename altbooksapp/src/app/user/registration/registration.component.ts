import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  faArrowCircleLeft = faArrowCircleLeft;


  
  
 


  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
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

}
