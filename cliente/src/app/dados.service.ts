import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bico } from './Bico';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Abastecimento } from './Abastecimento';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private readonly API = `${environment.API}`;
  
  constructor(private http: HttpClient) { }

  getBicos(){
    return this.http.get<Bico[]>(`${this.API}Bicos`).pipe(
      tap(console.log),
      take(1)
    );
  }

  getAbastecimentosFromBico(id:number){
    return this.http.get<Abastecimento[]>(`${this.API}Bicos/${id}`).pipe(
      tap(console.log),
      take(1)
    );
  }

  getAbastecimentos(id:number){
    return this.http.get<Abastecimento[]>(`${this.API}`).pipe(
      tap(console.log),
      take(1)
    );
  }

  sendAfericao(a: Abastecimento){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<any>(`${this.API}Bicos`,
    JSON.stringify(a), httpOptions).pipe(take(1));
  }

}
