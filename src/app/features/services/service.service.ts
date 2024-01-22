import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { from, Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  
  createUser(cdata: any): Observable<any> {
    console.log("check", cdata)
    return this.http.post(`${this.apiUrl}/`, cdata);
  }


  getAll(): Observable<any> {

    return this.http.get(`${this.apiUrl}/`);
  }


  getByIDUser(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/` + id);
  }


  updateUser(id: any, pdata: any): Observable<any> {
    console.log("check", id, pdata)
    console.log();

    return this.http.put(`${this.apiUrl}/` + id, pdata);
  }

  deleteUser(id: any): Observable<any> {
    console.log("check", id)
    console.log(id)
    return this.http.delete(`${this.apiUrl}/` + id);
  }
}
