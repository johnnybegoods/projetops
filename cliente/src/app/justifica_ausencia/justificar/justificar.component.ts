import { Component, OnInit } from '@angular/core';
import { AutService } from 'src/app/autorizaextra/aut.service';
import { Pessoa } from 'src/app/Pessoa';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { Abono } from '../Abono';
import { JustServiceService } from '../just-service.service';
import { Justificativa } from '../Justificativa';

@Component({
  selector: 'app-justificar',
  templateUrl: './justificar.component.html',
  styleUrls: ['./justificar.component.css']
})
export class JustificarComponent implements OnInit {
  private pessoas$:Observable<Pessoa[]>;
  private servidor:Pessoa = null;
  private justForm:FormGroup;
  private abonos:Abono[];
  private abono: Abono;
  private flexDate: boolean = false;
  private fixDate: boolean = false;
  private casamento: boolean = false;
  private concluido: boolean = false;
  private formato: boolean = true;


  constructor(
    private dados: AutService,
    private fb:FormBuilder,
    private serv: JustServiceService
  ) { }

  ngOnInit() {
    this.instanceForm();
  }

  onSubmit(){
    let j = new Justificativa();
    j.idServidor = this.servidor.id;
    j.servidor = this.servidor.nome;
    j.data_inicial = this.f.data_inicial.value.toString();
    j.data_final = this.f.data_final.value.toString();
    j.abonado = this.abono.abonado;
    j.motivo = this.abono.id;
    console.log(j);
    
  }

  inputFileChange(event){
    if(event.target.files > 1){
      event.target.files[0] = event.target.files[1];
      event.target.files[1] = null;
    }
    else{
      if(event.target.files && event.target.files[0]){
        const arq = event.target.files[0];
        const formData = new FormData();
        formData.append('arquivo', arq);
        if(event.target.value.toString().indexOf(".pdf") < 0){
          this.concluido = false;
          console.log("Só é permitido arquivo pdf");
          this.formato = false;
        }
        else{
          this.formato = true;
          this.concluido = true;
        }
        console.log(event.target.files[0].value);
        console.log(event.target.value);
      }
    }
  }

  get f(){
    return this.justForm.controls;
  }

  selectPessoa(evt){
    let p: Pessoa = new Pessoa();
    p = evt;
    this.servidor = p;
    this.f.nome.setValue(this.servidor.nome);
  }

  onSelect(evt){
    if(evt == 0){
      this.instanceAbono();
    }
    else{
      this.findAbono(evt);
      if(this.abono.data_final){
        if(this.abono.sub_opt == 1){
          this.flexDate = false;
          this.fixDate = false;
          this.casamento = false;
        }
        else{
          if(this.abono.sub_opt == 2){
            this.flexDate = false;
            this.casamento = true;
          }
          else{
            this.fixDate = false;
            this.flexDate = true;
            this.casamento = false;
          }
        }
      }
      else{
        this.flexDate = false;
        this.fixDate = false;
      }
      if(this.abono.dias > 0){
        let dateText = this.f.data_final.value.split("-");
        let d2 = new Date(this.f.data_final.value.toString());
        let aux = d2;
        d2.setDate(aux.getDate()+(this.abono.dias-1));
        this.f.data_final.setValue(d2.toISOString().split('T')[0]);
      }

    }
  }


  

  onSelect2(evt){
    switch(Number(evt)){
      case 1:
        this.abono.dias = 2;
        this.fixDate = true;
      break;
      case 2:
        this.abono.dias = 8;
        this.fixDate = true;
      break;
      default:
        this.abono.dias = 0;
        this.fixDate = false;
        this.concluido = false;
      break;
    }
    this.updateCalendar();
  }

  onSelectCasamento(evt){
    switch(Number(evt)){
      case 1:
        this.abono.dias = 5;
        let d1 = new Date(this.f.data_inicial.value.toString());
        let aux = d1;
        let fds = 0;
        for(let i = 0; i < 5; i++){
          aux.setDate(d1.getDate()+1);
          if(aux.getDay() == 6 || aux.getDay() == 0){
            fds++;
          }
        }
        d1.setDate(aux.getDate()+fds);
        this.fixDate = true;
        this.f.data_final.setValue(d1.toISOString().split('T')[0]);
      break;
      case 2:
        this.abono.dias = 5;
        let dd1 = new Date(this.f.data_inicial.value.toString());
        let aaux = dd1;
        let ffds = 0;
        for(let i = 0; i < 5; i++){
          aaux.setDate(dd1.getDate()-1);
          if(aaux.getDay() == 6 || aaux.getDay() == 0){
            ffds++;
          }
        }
        dd1.setDate(aaux.getDate()-ffds);
        this.fixDate = true;
        this.f.data_final.setValue(dd1.toISOString().split('T')[0]);
      
      break;
      default:
        this.abono.dias = 0;
        this.fixDate = false;
        this.concluido = false;
      break;
    }
  }


  updateCalendar(){
    if(this.abono.dias > 0){
      let d1 = new Date(this.f.data_inicial.value.toString());
      let aux = d1;
      d1.setDate(aux.getDate()+(this.abono.dias-1));
      this.f.data_final.setValue(d1.toISOString().split('T')[0]);
    }
  }


  findAbono(id: number){
    for(let i = 0; i < this.abonos.length; i++){
      if(this.abonos[i].id == id){
        this.abono = new Abono();
        this.abono = this.abonos[i];
        if(this.abono.sub_opt == 0 && !this.abono.anexo){
          this.concluido = true;
        }
        else{
          this.concluido = false;
        }
      }
    }
  }

  instanceForm(){

    this.pessoas$ = this.dados.getPessoas();
    this.serv.getAbonos().subscribe(
      dados => this.abonos = dados
    );

    this.instanceAbono();

    this.justForm = this.fb.group({
      nome: [null],
      data_inicial: [new Date(new Date).toISOString().split('T')[0], Validators.required],
      data_final: [new Date(new Date).toISOString().split('T')[0]],
      justificativa: [null, [Validators.minLength(24), Validators.maxLength(140)]],
      abono:[null, Validators.required]
    });

  }

  instanceAbono(){
    this.abono = new Abono();
    this.abono.data_final = false;
    this.abono.dias = 0;
    this.abono.sub_opt = 0;
    this.fixDate = false;
    this.flexDate = false;
    this.casamento = false;
    this.concluido = false;
  }

}
