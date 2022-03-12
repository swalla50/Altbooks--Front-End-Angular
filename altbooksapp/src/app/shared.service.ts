import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './shared/user.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  

  readonly APIUrl ="https://webapi20220126203702.azurewebsites.net/api/";
  
  constructor(private http:HttpClient, private fb:FormBuilder, private userinfo: UserService ) { }
  
  
  
  allUsers: any;








postCPFeed(val: any):Observable<any[]>{
  return this.http.post<any>(this.APIUrl+ 'AddCP/addCPitem', val)
}


  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/user');
  }

  addUser(val:any){
    return this.http.post(this.APIUrl+'/user',val)
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl+'/user',val)
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl+'/user',val)
  }

  getAllUserNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'UserList/userlist')
  }

  getCPFeed():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'GetCP/getCPFeed')
  }
  getFeedReply():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'getcomment/getcomment')
  } 
  postCPReply(val: any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+ 'AddComment/addCommentitem', val)
  }
  
}
