import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Abono } from './Abono';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JustServiceService {

  constructor(private http:HttpClient) { }

  getAbonos(){
    return this.http.get<Abono>("http://localhost:3001/abono").pipe(
      tap(console.log),
      take(1)
    );
  }

  getAbonoById(id:number){
    return this.http.get<Abono>(`http://localhost:3001/abono/${id}`).pipe(
      tap(console.log),
      take(1)
    );
  }

}
