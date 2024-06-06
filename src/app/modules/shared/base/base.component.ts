import { Component } from '@angular/core';
import {Cliente} from "../../../models/response/cliente-response.model";
import {SelectModel} from "../../../models/SelectModel";

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

}
