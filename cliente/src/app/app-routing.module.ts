import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { AppComponent } from './app.component';
import { NovaAutorizacaoComponent } from './autorizaextra/nova-autorizacao/nova-autorizacao.component';
import { HistoricoComponent } from './autorizaextra/historico/historico.component';
import { MinhasAutorizacoesComponent } from './autorizaextra/minhas-autorizacoes/minhas-autorizacoes.component';
import { JustificarComponent } from './justifica_ausencia/justificar/justificar.component';
import { AutorizacaoViewComponent } from './autorizaextra/autorizacao-view/autorizacao-view.component';
import { FechamentoComponent } from './autorizaextra/fechamento/fechamento.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RelatoriosComponent } from './autorizaextra/relatorios/relatorios.component';
import { ListaBicosComponent } from './lista-bicos/lista-bicos.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'lista-bicos', component: ListaBicosComponent }


 /* { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'nova-autorizacao', component: NovaAutorizacaoComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'minhasautorizacoes', component: MinhasAutorizacoesComponent },
  { path: 'justificar', component: JustificarComponent },
  { path: 'autorizacao', component: AutorizacaoViewComponent },
  { path: 'fechamento', component: FechamentoComponent },
  { path: 'relatorios', component: RelatoriosComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
