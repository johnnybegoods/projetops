import { Pessoa } from '../Pessoa';
import { Competencia } from './Competencia';

export class Autorizacao{
     id:number;
     servidor:Pessoa[];
     data_ocorrencia:Date;
     data_autorizacao:Date;
     justificativa:string;
     horas:number;
     horaString:string;
     pgto:boolean;
     responsavel:Pessoa;
     competencia:Competencia;
     autorizada:boolean;

}