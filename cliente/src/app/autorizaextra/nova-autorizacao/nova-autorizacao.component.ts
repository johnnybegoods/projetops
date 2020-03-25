import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/Pessoa';
import { AutService } from '../aut.service';
import { FormsModule, FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Autorizacao } from '../Autorizacao';
import { Competencia } from '../Competencia';



@Component({
  selector: 'app-nova-autorizacao',
  templateUrl: './nova-autorizacao.component.html',
  styleUrls: ['./nova-autorizacao.component.css']
})
export class NovaAutorizacaoComponent implements OnInit {
  private pessoas$:Observable<Pessoa[]>;
  private servidor:Pessoa[] = new Array();;
  private formAut:FormGroup;
  private pgto:boolean = false;
  private tipo:string = "Banco";
  private timeValid:boolean = false;
  private success:boolean = false;
  private error:boolean = false;
  private lote:boolean = false;
  private showForm:boolean = false;
  private resp:Pessoa;


  constructor(
    private dados:AutService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.pessoas$ = this.dados.getPessoas();
    this.instanceForm();
  }

  get f(){
    return this.formAut.controls;
  }

  selectPessoa(evt){
    let p: Pessoa = new Pessoa();
    p = evt;
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
    let aut:Autorizacao = new Autorizacao();
    aut.servidor = this.servidor;
    aut.data_autorizacao = new Date();
    aut.data_ocorrencia = new Date(this.f.data.value.toString());
    aut.data_ocorrencia.setDate(aut.data_ocorrencia.getDate());
    aut.justificativa = this.f.justificativa.value;
    aut.responsavel = this.servidor[0];
    let hs = this.f.horas.value.toString().split(":");
    aut.horas = (Number(hs[0])*60) + (Number(hs[1]));
    aut.pgto = this.pgto;
    let c = new Competencia();
    c.id = 1;
    c.responsavel = this.servidor[0];
    c.situacao = 'ABERTO';
    c.competencia_ = new Date();
    aut.competencia = c;
    if(aut.responsavel.usuario == "Servidor"){
      aut.autorizada = true;
    }
    else{
      aut.autorizada = false;
    }
    this.dados.persistAutorizacao(aut).subscribe(
      success => {
        console.log("Cadastrado com Sucesso");
        this.sucesso();
        this.cancela();
        this.timeValid = false;
        this.pgto = false;
        this.tipo = "Banco";
        this.showForm = false;
        this.lote = false;
        this.formAut.reset();
        this.instanceForm();
      },
      error => {
        console.log("Exception : "+error.Exception);
        this.erro();
      }
    );

  }

  instanceForm(){
    this.formAut = this.fb.group({
      nome: [null],
      data: [new Date(new Date).toISOString().split('T')[0], Validators.required],
      justificativa: [null, [Validators.required, Validators.minLength(24), Validators.maxLength(140)]],
      horas: [0, Validators.required],
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
    this.lote = !this.lote;
    this.showForm = !this.lote;
  }

  confirma(){
    this.showForm = true;
  }
  cancela(){
    this.showForm = false;
    this.lote = false;
    for(let i = 0; i <= this.servidor.length; i++){
      this.servidor.pop();
    }
    this.servidor.pop();
  }

}
