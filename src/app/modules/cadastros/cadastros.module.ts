import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { FerramentasComponent } from './ferramentas/ferramentas.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { MaterialModule } from '../material.module';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { GridClienteComponent } from './clientes/grid/grid-cliente/grid-cliente.component';
import { ModalClienteComponent } from './clientes/modal/modal-cliente/modal-cliente.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { GridFornecedorComponent } from './fornecedores/grid/grid-fornecedor/grid-fornecedor.component';
import { ModalFornecedorComponent } from './fornecedores/modal/modal-fornecedor/modal-fornecedor.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { GridFuncionarioComponent } from './funcionarios/grid/grid-funcionario/grid-funcionario.component';
import { ModalFuncionarioComponent } from './funcionarios/modal/modal-funcionario/modal-funcionario.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ModalDepartamentosComponent } from './departamentos/modal/modal-departamentos/modal-departamentos.component';
import { GridDepartamentosComponent } from './departamentos/grid/grid-departamentos/grid-departamentos.component';
import { NgxMaskDirective } from "ngx-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ModalProdutoComponent } from './produtos/modal/modal-produto/modal-produto.component';
import { GridProdutoComponent } from './produtos/grid/grid-produto/grid-produto.component';
import { GridMaquinaComponent } from './maquinas/grid/grid-maquina/grid-maquina.component';
import { ModalMaquinaComponent } from './maquinas/modal/modal-maquina/modal-maquina.component';
import { OperacoesComponent } from './operacoes/operacoes/operacoes.component';
import { GridOperacoesComponent } from './operacoes/grid/grid-operacoes/grid-operacoes.component';
import { ModalOperacoesComponent } from './operacoes/modal/modal-operacoes/modal-operacoes.component';

@NgModule({
  declarations: [
    ClientesComponent,
    FerramentasComponent,
    MaquinasComponent,
    ProdutosComponent,
    GridClienteComponent,
    ModalClienteComponent,
    FornecedoresComponent,
    GridFornecedorComponent,
    ModalFornecedorComponent,
    FuncionariosComponent,
    GridFuncionarioComponent,
    ModalFuncionarioComponent,
    DepartamentosComponent,
    ModalDepartamentosComponent,
    GridDepartamentosComponent,
    ModalProdutoComponent,
    GridProdutoComponent,
    GridMaquinaComponent,
    ModalMaquinaComponent,
    OperacoesComponent,
    GridOperacoesComponent,
    ModalOperacoesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 150000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
  ]
})
export class CadastrosModule { }
