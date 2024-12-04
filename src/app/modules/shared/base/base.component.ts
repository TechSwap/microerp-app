import { Component } from '@angular/core';
import {Cliente} from "../../../models/response/cliente-response.model";
import {SelectModel} from "../../../models/SelectModel";
import {Departamento} from "../../../models/response/departamento-response.model";
import {Fornecedor} from "../../../models/response/fornecedor-response.model";
import {UnidadeMedida} from "../../../models/unidade.model";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  public loadDropClientes(clientes: Cliente[], drop: SelectModel[]) {
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    drop.push(firstPosition)
    clientes.forEach(cliente => {
      drop.push({
        Id: cliente.idCliente,
        Descricao: cliente.nome
      });
    });
    return drop;
  }

  public loadDropDepartamentos(departamentos: Departamento[], drop: SelectModel[]) {
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    drop.push(firstPosition)
    departamentos.forEach(departamento => {
      drop.push({
        Id: departamento.idDepartamento,
        Descricao: departamento.descricao
      });
    });
    return drop;
  }

  public loadDropFornecedor(fornecedores: Fornecedor[], drop: SelectModel[]) {
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    drop.push(firstPosition)
    fornecedores.forEach(fornecedor => {
      drop.push({
        Id: fornecedor.idFornecedor,
        Descricao: fornecedor.nome
      });
    });
    return drop;
  }

  public loadDropDepartamento(departamentos: Departamento[], drop: SelectModel[]) {
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    drop.push(firstPosition)
    departamentos.forEach(departamento => {
      drop.push({
        Id: departamento.idDepartamento,
        Descricao: departamento.descricao
      });
    });
    return drop;
  }

  public loadDropUnidades(drop: SelectModel[]) {
    let unidades: UnidadeMedida[] = [
      { value: 'PC', viewValue: 'Pecas' },
      { value: 'MT', viewValue: 'Metros' },
      { value: 'LT', viewValue: 'Litros' },
    ];
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    drop.push(firstPosition)
    unidades.forEach(unidade => {
      drop.push({
        Id: unidade.value,
        Descricao: unidade.viewValue
      });
    })
    return drop;
  }

  public getStatus(status: number): string {
    if(status === 1) {
      return  'Aberta'
    } else if(status === 2) {
      return 'Em Producao'
    } else if(status === 3 ) {
      return 'Producao Parcial'
    } else if(status === 4) {
      return 'Concluido'
    } else if(status === 5) {
      return 'Faturado'
    } else {
      return ''; // Add this line to handle the case when status is not one of the expected values
    }
  }

  public getClass(status: number): string {
    if(status === 1) {
      return  'Aberta'
    } else if(status === 2) {
      return 'EmProducao'
    } else if(status === 3 ) {
      return 'ProducaoParcial'
    } else if(status === 4) {
      return 'Concluido'
    } else if(status === 5) {
      return 'Faturado'
    } else {
      return ''; // Add this line to handle the case when status is not one of the expected values
    }
  }
}
