import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Competencia } from '../Competencia';
import { AutService } from '../aut.service';
import { Autorizacao } from '../Autorizacao';

@Component({
  selector: 'app-minhas-autorizacoes',
  templateUrl: './minhas-autorizacoes.component.html',
  styleUrls: ['./minhas-autorizacoes.component.css']
})
export class MinhasAutorizacoesComponent implements OnInit {
  private competencias$:Observable<Competencia[]>;
  private autorizacoes:Autorizacao[];
  private autorizadas:Autorizacao[];
  private naoAutorizadas:Autorizacao[];
  private comp:number;

  constructor(private dados:AutService) { }

  ngOnInit() {
    this.competencias$ = this.dados.getCompetenciasDeSolicitacoes();
    this.autorizacoes = new Array();
  }

  openCompetencia(evt){
    if(this.comp == evt){
      this.comp = 0;
    }
    else{
      this.comp = evt;
      this.dados.getAutorizacoesByIdCompetencia(evt).subscribe(
        dados => this.autorizacoes = dados
      );
    }
  }

}
