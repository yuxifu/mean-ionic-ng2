import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Todos {
 
  // public static ApiServer: string = 'https://YOUR_HEROKU_APP.herokuapp.com/';
  public static ApiServer: string = 'http://127.0.0.1:8080/';

  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getTodos(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get(Auth.ApiServer + 'api/todos', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }
 
  createTodo(todo){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post(Auth.ApiServer + 'api/todos', JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  deleteTodo(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete(Auth.ApiServer + 'api/todos/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
 
    });
 
  }
 
}