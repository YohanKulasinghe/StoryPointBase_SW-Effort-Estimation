import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PythonService {

  constructor(private _http:HttpClient) { }


  getTimeEstimation(body:any){
    return this._http.post('http://127.0.0.1:5000/setTotalStoryPoint',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getCostEstimation(body:any){
    return this._http.post('http://127.0.0.1:5000/setCostDrivers',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
