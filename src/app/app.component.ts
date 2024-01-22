import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  template: `
    <input [(ngModel)]="model.title" />
    <button (click)="save()">Kaydet</button>
  `,
})
export class AppComponent {
  title = 'restful-api';
 
  model: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  } = {
    id: 0,
    title: '',
    completed: false,
    userId: 1,
  };

  save() {    
    this._http
      .post('https://jsonplaceholder.typicode.com/todos/', this.model)
      .subscribe((res) => {
        console.log(res);
      });

    //Service üzerinden
      this._app.add({ userId: 1, id: 0, title: 'Deneme', completed: false}).subscribe(res =>{
        console.log(res);
      });
    //Service üzerinden Callback örneği
    this._app.add2({ userId: 1, id: 0, title: 'Deneme', completed: false}, (res) => {      
      console.log(res);
    });
  }
  
  constructor(
    private _http: HttpClient, 
    private _app:AppService, private _err:ErrorService
    ) {
    //Service üzerinden
    _app.get().subscribe(res =>{
      console.log(res);
    });

    //Callback örneği
    _app.get2((res)=>{
      console.log(res);
    })
      
    this._http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((res) => {
        console.log(res);
      });

    this._http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        //console.log(err);
        this._err.errorHandler(err);
      },
      complete: () => {},
    });


    //Header Örneği
    let headers={
      headers:{
        "authorization":"deger"
      }
    }
    this._http
    .get('https://jsonplaceholder.typicode.com/todos',headers)
    .subscribe((res) => {
      console.log(res);
    });


    /*
    let model = {
      userId: 1,
      id: 0,
      title: 'Deneme',
      completed: false,
    };

    this._http
      .post('https://jsonplaceholder.typicode.com/todos/', model)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          //console.log(err);
           this._err.errorHandler(err);      
        },
      });

      */
  }
}
