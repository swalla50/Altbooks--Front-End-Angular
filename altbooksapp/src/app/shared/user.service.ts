import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  fullName: string | undefined;

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://webapi20220126203702.azurewebsites.net/api';

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : ['', Validators.required],
    Passwords : this.fb.group({
      Password : ['', [Validators.required,Validators.minLength(4)]],
      ConfirmPassword : ['', Validators.required]
    }),
    PhoneNumber : ['', Validators.required],
    orgName : ['', Validators.required],
    orgType : ['', Validators.required],
    UserRole : ['',Validators.required]

  });

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
      PhoneNumber: this.formModel.value.PhoneNumber,
      orgName: this.formModel.value.orgName,
      orgType: this.formModel.value.orgType,
      UserRole: this.formModel.value.UserRole
    };
    return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);
  }

  login(formData:any){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
  }

  getUserProfile():Observable<any[]>{
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')})
    return this.http.get<any>(this.BaseURI+'/UserProfile', {headers : tokenHeader}).pipe(share());
  }
  // comparePasswords(fb: FormGroup){
  //   let confirmPasswordCtrl = fb.get('ConfirmPassword');
  //   //PassowordMismatch
  //   //confirmPswrdCtrl.errors={requiredLtrue}
  //   if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
  //     if(fb.get('Password').value!= confirmPasswordCtrl)
  //     confirmPasswordCtrl?.setErrors({passwordmisMatc: true});
  //     else
  //       confirmPasswordCtrl.setErrors(null);
  //     //PassowordMismatch)
  //   }
  // }
}
