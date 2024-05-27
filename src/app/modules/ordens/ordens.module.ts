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


@NgModule({
  declarations: [
    ServicosComponent,
    ProducaoComponent,
    ComprasComponent,
    ModalServicoComponent,
    GridServicosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CurrencyMaskModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
  ]
})
export class OrdensModule { }
