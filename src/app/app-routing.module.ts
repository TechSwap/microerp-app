import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AuthenticadedGuard } from './guard/auth.guard';
import { FerramentasComponent } from './modules/cadastros/ferramentas/ferramentas.component';
import { ClientesComponent } from './modules/cadastros/clientes/clientes.component';
import { ProdutosComponent } from './modules/cadastros/produtos/produtos.component';
import { MaquinasComponent } from './modules/cadastros/maquinas/maquinas.component';
import { ComprasComponent } from './modules/ordens/compras/compras.component';
import { ProducaoComponent } from './modules/ordens/producao/producao.component';
import { ServicosComponent } from './modules/ordens/servicos/servicos.component';
import { ResumoComponent } from './modules/producao/resumo/resumo.component';
import { UsuariosComponent } from './modules/usuarios/usuarios/usuarios.component';
import { PerfilComponent } from './modules/usuarios/perfil/perfil.component';
import {FuncionariosComponent} from "./modules/cadastros/funcionarios/funcionarios.component";
import {FornecedoresComponent} from "./modules/cadastros/fornecedores/fornecedores.component";
import {DepartamentosComponent} from "./modules/cadastros/departamentos/departamentos.component";
import {EmpresaComponent} from "./modules/empresa/empresa/empresa.component";
import {OrdemProducaoComponent} from "./modules/ordens/producao/Op/ordem-producao/ordem-producao.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticadedGuard],
    children: [
      { path: 'cadastros/ferramentas', component: FerramentasComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/clientes', component: ClientesComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/produtos', component: ProdutosComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/funcionarios', component: FuncionariosComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/departamentos', component: DepartamentosComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/fornecedores', component: FornecedoresComponent, canActivate: [AuthenticadedGuard] },
      { path: 'cadastros/maquinas', component: MaquinasComponent, canActivate: [AuthenticadedGuard] },
      { path: 'ordens/compras', component: ComprasComponent, canActivate: [AuthenticadedGuard] },
      { path: 'ordens/producao', component: ProducaoComponent, canActivate: [AuthenticadedGuard] },
      { path: 'ordens/novaOp', component: OrdemProducaoComponent, canActivate: [AuthenticadedGuard] },
      { path: 'ordens/servicos', component: ServicosComponent, canActivate: [AuthenticadedGuard] },
      { path: 'producao/resumo', component: ResumoComponent, canActivate: [AuthenticadedGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthenticadedGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthenticadedGuard] },
      { path: 'empresa', component: EmpresaComponent, canActivate: [AuthenticadedGuard] },

    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
