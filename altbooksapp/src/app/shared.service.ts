import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl ="https://webapi20220126203702.azurewebsites.net/api/";
  constructor(private http:HttpClient) { }

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
    return this.http.get<any[]>(this.APIUrl+'/user')
  }
}
