import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _genericHttp:GenericHttpService,
    private _http:HttpClient
    ) { }

    get()
    {
      return this._http.get("https://jsonplaceholder.typicode.com/todos");
    } 

    //Callback örneği
    get2(callback: (res:any)=> void)
    {
      this._http.get("https://jsonplaceholder.typicode.com/todos").subscribe({
        next:(res)=>{
          console.log(res);
          callback(res);
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
        }
      })
    } 
    
    //GenericHttpService örneği
    get3(callBack: (res:any)=> void){
      this._genericHttp.get("todos",res => callBack(res));
    }

    add(model:any){
      return this._http.post("https://jsonplaceholder.typicode.com/todos",model,{});
    }

    //callback
    add2(model:any, callBack: (res:any)=>void){
      this._http.post("https://jsonplaceholder.typicode.com/todos",model,{}).subscribe({
        next:(res:any) => {
          callBack(res);
        },
        error:(err:HttpErrorResponse) =>{
          console.log(err);
        }
      });
    }

    //generic_http_service
    add3(model:any, callBack: (res:any)=>void){
      this._genericHttp.post("todos",model,res => callBack(res));
    }
   
}
