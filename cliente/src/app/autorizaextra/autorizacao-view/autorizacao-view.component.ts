import { Component, OnInit } from '@angular/core';
import { AutService } from '../aut.service';
import { Observable } from 'rxjs';
import { Autorizacao } from '../Autorizacao';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Competencia } from '../Competencia';
import { Pessoa } from 'src/app/Pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizacao-view',
  templateUrl: './autorizacao-view.component.html',
  styleUrls: ['./autorizacao-view.component.css']
})
export class AutorizacaoViewComponent implements OnInit {
  private autorizacao:Autorizacao;
  private pessoas$:Observable<Pessoa[]>;
  private servidor:Pessoa[] = new Array();;
  private formAut:FormGroup;
  private pgto:boolean = false;
  private tipo:string = "Banco";
  private timeValid:boolean = false;
  private success:boolean = false;
  private error:boolean = false;
  private lote:boolean = false;
  private showForm:boolean = true;
  private resp:Pessoa;
  private horaString:string;


  constructor(
    private dados:AutService,
    private fb:FormBuilder,
    private route:Router
  ) { }

  ngOnInit() {
    this.pessoas$ = this.dados.getPessoas();
    this.autorizacao = this.dados.getAutorizacao();
    this.servidor = this.autorizacao.servidor;
    this.instanceForm();    
  }

  get f(){
    return this.formAut.controls;
  }

  selectPessoa(evt){
    let p: Pessoa = new Pessoa();
    p = evt;
    this.servidor.pop();
    this.servidor.push(p);
    let nomes = "";
    for(let i = 0; i < this.servidor.length; i++){
      nomes += this.servidor[i].nome+";";
    }
    this.f.nome.setValue(nomes);
    if(!this.lote){
      this.showForm = true;
    }
    console.log(this.servidor);
  }

 
  setTipo(){
    this.pgto = !this.pgto;
    if(this.pgto){
      this.tipo = "Pagamento";
    }
    else{
      this.tipo = "Banco";
    }
  }

  verificaValidTouched(campo){
    return !this.formAut.get(campo).valid && 
          this.formAut.get(campo).touched;

  }

  verificaValidTouchedTime(campo){
    
      if(this.formAut.get(campo).touched){
        return this.validaHoras();
      }    
  }

  validaHoras(){
    let hs = this.f.horas.value.toString().split(":");
      let minuto = (Number(hs[0])*60) + (Number(hs[1]));
      if(minuto > 10){
        this.timeValid = true;
        return false;
      }
      else{
        return true;
      }
  }

  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidTouched(campo),
      'hhas-feedback': this.verificaValidTouched(campo)
    }
  }

  onSubmit(){
    
    let aut:Autorizacao = this.autorizacao;
    aut.servidor = this.servidor;
    aut.data_ocorrencia = new Date(this.f.data_oco.value.toString());
    aut.data_ocorrencia.setDate(aut.data_ocorrencia.getDate());
    aut.justificativa = this.f.justificativa.value;
    let hs = this.f.horas.value.toString().split(":");
    aut.horas = (Number(hs[0])*60) + (Number(hs[1]));
    aut.pgto = this.pgto;
    aut.competencia = this.autorizacao.competencia;
    
    this.dados.updateAutorizacao(aut).subscribe(
      success => {
        console.log("Cadastrado com Sucesso");
        this.sucesso();
        this.route.navigate([this.dados.getRota()]);
      },
      error => {
        console.log("Exception : "+error.Exception);
        this.erro();
      }
    );

  }

  instanceForm(){
    this.pgto = !this.autorizacao.pgto;
    this.setTipo();
    let dataString = new Date(this.autorizacao.data_ocorrencia).toISOString().split('T')[0];
    this.horaString = this.autorizacao.horaString;
    console.log(this.horaString);
    this.formAut = this.fb.group({
      nome: [this.autorizacao.servidor[0].nome, Validators.required],
      data_oco: [dataString, Validators.required],
      justificativa: [this.autorizacao.justificativa, [Validators.required, Validators.minLength(24), Validators.maxLength(140)]],
      horas: [this.horaString, Validators.required],
      tipo: [this.tipo, Validators.required]
    });
  }

  sucesso(){
    this.success = true;
    setInterval(() => {
      this.clearToastt(); 
    }, 5000);
  }

  erro(){
    this.error = true;
    setInterval(() => {
      this.clearToastt(); 
    }, 5000);
  }

  clearToastt(){
    this.success = false;
    this.error = false;
  }

  setLote(){
    this.showForm = !this.showForm;
  }

  confirma(){
    this.showForm = true;
  }
  cancela(){
    this.showForm = true;
    
  }

  voltar(){
    this.route.navigate([this.dados.getRota()]);
  }

}

