import { Component, OnInit } from '@angular/core';
import { AutService } from '../aut.service';
import { Observable } from 'rxjs';
import { Competencia } from '../Competencia';
import { Autorizacao } from '../Autorizacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  private competencias$: Observable<Competencia[]>;
  private compId:number = 0;
  private autorizacoes:Autorizacao[] = new Array();
  private idAut:number = 0;

  constructor(private service:AutService, private router:Router) { }

  ngOnInit() {
    this.competencias$ = this.service.getCompetencias();
      
  }

  openCompetencia(evt){
    if(this.compId == evt && this.idAut == 0){
      this.compId = 0;
    }
    else{
      this.compId = evt;
    }
    this.service.getAutorizacoesByIdCompetencia(evt).subscribe(
      dados=>this.autorizacoes = dados
    );
    
  }

  selectAutorizacao(evt){
    this.service.setIdAutorizacao(evt);
    this.router.navigate(['/autorizacao']);
    this.service.setRota('/historico');
  }

}
