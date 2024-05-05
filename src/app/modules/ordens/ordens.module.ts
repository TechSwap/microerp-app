import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosComponent } from './servicos/servicos.component';
import { ProducaoComponent } from './producao/producao.component';
import { ComprasComponent } from './compras/compras.component';



@NgModule({
  declarations: [
    ServicosComponent,
    ProducaoComponent,
    ComprasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrdensModule { }
