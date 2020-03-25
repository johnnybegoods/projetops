import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Autorizacao } from '../Autorizacao';
import { AutService } from '../aut.service';
import { Observable } from 'rxjs';
import { Competencia } from '../Competencia';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  private dados:Autorizacao[];
  private competencias$:Observable<Competencia[]>;

  constructor(private serv: AutService) { }

  ngOnInit() {
    this.competencias$ = this.serv.getCompetencias();
    this.dados = new Array();
  }

  public downloadPdf(){
    let rows =  new Array();

    for(let i = 0; i < this.dados.length; i++){
      console.log(i);
      let auts = new Array();
      auts.push(this.dados[i].servidor[0].nome);
      auts.push(this.dados[i].data_ocorrencia);
      auts.push(this.dados[i].data_autorizacao);
      auts.push(this.dados[i].justificativa);
      auts.push(this.dados[i].horaString);
      rows.push(auts);
    }
    console.log("Dados Length  " + this.dados.length);
    console.log("rowsLength  " + rows.length);

    let columns = ["Servidor", "Data da Ocorrência", "Data da Autorização", 
            "Justificativa", "Horas"];
    /*
    let rows = [
        [1, "Shaw", "Tanzania"],
        [2, "Nelson", "Kazakhstan"],
        [3, "Garcia", "Madagascar"],
    ];
    */
    let doc = new jsPDF('l', 'pt');
    doc.setFontSize(22);
    doc.text(300, 30, 'Serviço Municipal de Saúde');
    doc.setFontSize(16);
    doc.text(293, 50, 'Autorização de Serviços Extraordinários');
    doc.setFontSize(14);
    doc.text(353, 70, 'Competência - 02/2020', 'center');
    
    doc.autoTable({
      margin: { top: 80 },
      columns, rows
    }); // typescript compile time error

    doc.setFontSize(14);
    doc.text("Nome Completo para Assinatura", 300, doc.internal.pageSize.height - 30);
    doc.save('table.pdf');
  }


  openCompetencia(evt){
    this.serv.getAutorizacoesByIdCompetencia(evt).subscribe(
      res => {
        this.dados = res
      }
    );

    this.downloadPdf();
  }
}


