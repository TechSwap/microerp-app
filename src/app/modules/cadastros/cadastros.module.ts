import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { FerramentasComponent } from './ferramentas/ferramentas.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { MaterialModule } from '../material.module';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { GridClienteComponent } from './clientes/grid/grid-cliente/grid-cliente.component';
import { ModalClienteComponent } from './clientes/modal/modal-cliente/modal-cliente.component';

@NgModule({
  declarations: [
    ClientesComponent,
    FerramentasComponent,
    MaquinasComponent,
    ProdutosComponent,
    GridClienteComponent,
    ModalClienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
  ]
})
export class CadastrosModule { }
