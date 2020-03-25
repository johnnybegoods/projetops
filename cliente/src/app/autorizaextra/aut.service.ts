import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from '../Pessoa';
import { environment } from 'src/environments/environment';
import { map, catchError, tap, take } from 'rxjs/operators';
import { Autorizacao } from './Autorizacao';
import { Competencia } from './Competencia';



@Injectable({
  providedIn: 'root'
})
export class AutService {
  private readonly API = `${environment.API}`;  
  private aut:Autorizacao;
  private rota:string;

  
  constructor(private http:HttpClient) { }

  getPessoas(){
    return this.http.get<Pessoa>(`${this.API}Pessoa`).pipe(
      tap(console.log),
      take(1)
    );
  }


  getCompetencias(){
    return this.http.get<Competencia[]>(`${this.API}Competencia`).pipe(
      tap(console.log),
      take(1)
    );
  }

  getAutorizacoes(){
    return this.http.get<Autorizacao[]>(`${this.API}Autorizacao`).pipe(
      tap(console.log),
      take(1)
    );
  }

  getAutorizacoesByIdCompetencia(id:number){
    return this.http.get<Autorizacao[]>(`${this.API}Competencia/${id}`).pipe(
      tap(console.log),
      take(1)
    );
  }

  

  persistAutorizacao(aut: Autorizacao){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<any>(`${this.API}Autorizacao`,
    JSON.stringify(aut), httpOptions).pipe(take(1));
  }

  updateAutorizacao(aut:Autorizacao){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.put<any>(`${this.API}Autorizacao/${aut.id}`,
    JSON.stringify(aut), httpOptions).pipe(take(1));
  }

  setIdAutorizacao(autorizacao:Autorizacao){
    this.aut = autorizacao;
  }

  getAutorizacao():Autorizacao{
    return this.aut;
  }

  setRota(r:string){
    this.rota = r;
  }

  getRota():string{
    return this.rota;
  }

  getCompetenciasDeSolicitacoes(){
    return this.http.get<Competencia[]>(`${this.API}Solicitacoes`).pipe(
      tap(console.log),
      take(1)
    );
  }



/*
  getHorasToString(aut:Autorizacao):string{
    let hText:string;
    let minText:string;
    let num = aut.horas;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    if(rhours < 10){
      hText = "0"+rhours;
    }
    else{
      hText = ""+rhours;
    }
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if(rminutes < 10){
      minText = "0"+rminutes;
    }
    else{
      minText = ""+rminutes;
    }
    //console.log("hText = "+hText.length +"  - minText = "+minText.length);
    console.log(num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).");
    return hText + ":" + minText;
  }
  */

}
