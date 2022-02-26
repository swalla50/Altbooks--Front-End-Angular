import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinDataService {

  constructor(private _http: HttpClient) { }

  readonly APIUrl ="https://webapi20220126203702.azurewebsites.net/api/finance/financeData";

  dailyFinance():Observable<any[]>{
    return this._http.get<any>(this.APIUrl);
  }
}
