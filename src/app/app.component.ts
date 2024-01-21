import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

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
  }

  constructor(private _http: HttpClient) {
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
        console.log(err);
      },
      complete: () => {},
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
          console.log(err);
        },
      });

      */
  }
}
