import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NovaAutorizacaoComponent } from './autorizaextra/nova-autorizacao/nova-autorizacao.component';
import { HistoricoComponent } from './autorizaextra/historico/historico.component';
import { MinhasAutorizacoesComponent } from './autorizaextra/minhas-autorizacoes/minhas-autorizacoes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Importação
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JustificarComponent } from './justifica_ausencia/justificar/justificar.component';
import { AutorizacaoViewComponent } from './autorizaextra/autorizacao-view/autorizacao-view.component';
import { FechamentoComponent } from './autorizaextra/fechamento/fechamento.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RelatoriosComponent } from './autorizaextra/relatorios/relatorios.component';
import { ListaBicosComponent } from './lista-bicos/lista-bicos.component';


@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    NovaAutorizacaoComponent,
    HistoricoComponent,
    MinhasAutorizacoesComponent,
    JustificarComponent,
    AutorizacaoViewComponent,
    FechamentoComponent,
    HomeComponent,
    LoginComponent,
    RelatoriosComponent,
    ListaBicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
