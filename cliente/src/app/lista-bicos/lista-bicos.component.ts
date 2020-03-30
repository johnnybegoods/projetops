import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bico } from '../Bico';
import { DadosService } from '../dados.service';
import { Abastecimento } from '../Abastecimento';

@Component({
  selector: 'app-lista-bicos',
  templateUrl: './lista-bicos.component.html',
  styleUrls: ['./lista-bicos.component.css']
})
export class ListaBicosComponent implements OnInit {
  private ListaBicos$:Observable<Bico[]>;
  private abastecimentos$:Observable<Abastecimento[]>;
  private bico: number = 0;

  constructor(private dados: DadosService) { }

  ngOnInit() {
    this.ListaBicos$ = this.dados.getBicos();
    console.log("lista = "+this.ListaBicos$);
  }

  selectBico(evt){
    if(this.bico != evt){
      this.bico = evt;
      this.abastecimentos$ = this.dados.getAbastecimentosFromBico(evt);
    }
    else{
      this.bico = 0;
    }
  }

  senAfericao(evt){
    this.dados.sendAfericao(evt).subscribe(
      success => {
        alert("Aferição Concluída");
      },
      error => {
        alert("Erro ao realizar Aferição");
      }
    );
  }

}
