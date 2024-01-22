import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  apiUrl:string ="https://jsonplaceholder.typicode.com/"
  
  constructor(
    private _http:HttpClient,
    private _err:ErrorService
    ) { }


  get(apiAddress:string, callBack:(res:any)=> void){
    this._http.get(this.apiUrl+apiAddress,{}).subscribe({
      next:(res)=>{
        callBack(res);
      },
      error:(err:HttpErrorResponse)=>{
        this._err.errorHandler(err);
      }
    })
  }
 
  getWithHeaders(apiAddress:string, callBack:(res:any)=> void){
    let headers={
      headers:{
        "authorization":localStorage.getItem("token")!
      }
    }

    this._http.get(this.apiUrl + apiAddress, headers).subscribe({
      next:(res)=>{
        callBack(res);
      },
      error:(err:HttpErrorResponse)=>{
        this._err.errorHandler(err);
      }
    })
  }

  post(apiAddress:string, model:any, callBack:(res:any)=>void){
    this._http.post(this.apiUrl+apiAddress,model,{}).subscribe({
      next:(res)=>{
        callBack(res);
      },
      error:(err: HttpErrorResponse)=>{
        this._err.errorHandler(err);
      }
    })
  }

}
