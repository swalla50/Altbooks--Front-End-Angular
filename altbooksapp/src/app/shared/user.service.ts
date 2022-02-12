import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://webapi20220126203702.azurewebsites.net/api';

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : ['', Validators.required],
    Passwords : this.fb.group({
      Password : ['', [Validators.required,Validators.minLength(4)]],
      ConfirmPassword : ['', Validators.required]
    })

  });

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);
  }

  login(formData:any){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')})
    return this.http.get(this.BaseURI+'/UserProfile', {headers : tokenHeader});
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
