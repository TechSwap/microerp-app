import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosComponent } from './servicos/servicos.component';
import { ProducaoComponent } from './producao/producao.component';
import { ComprasComponent } from './compras/compras.component';
import { MaterialModule } from '../material.module';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalServicoComponent } from './servicos/modal/modal-servico/modal-servico.component';
import { GridServicosComponent } from './servicos/grid/grid-servicos/grid-servicos.component';
import {SharedModule} from "../../shared/shared.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import { GridComprasComponent } from './compras/grid/grid-compras/grid-compras.component';
import { ModalComprasComponent } from './compras/modal/modal-compras/modal-compras.component';
import { GridProducaoComponent } from './producao/grid/grid-producao/grid-producao.component';
import { OrdemProducaoComponent } from './producao/Op/ordem-producao/ordem-producao.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    ServicosComponent,
    ProducaoComponent,
    ComprasComponent,
    ModalServicoComponent,
    GridServicosComponent,
    GridComprasComponent,
    ModalComprasComponent,
    GridProducaoComponent,
    OrdemProducaoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CurrencyMaskModule,
    RouterLink
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
  ]
})
export class OrdensModule { }
