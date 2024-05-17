import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalServicoComponent } from './modal/modal-servico/modal-servico.component';
import {DetalheOrdemServico, OrdemServicoModel} from "../../../models/ordemServico.model";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  novaOs: OrdemServicoModel = {
    idOrdemServico: '',
    numeroOS: 0,
    idCliente: '',
    solicitante: '',
    notaSaida: '',
    notaEntrada: '',
    pedido: '',
    orcamento: '',
    valorTotal: 0,
    prazo: 0,
    dataCadastro: new Date,
    dataPrevisaoEntrega: new Date,
    dataEntrega: new Date,
    DetalheOrdemServicos: []
  }

  constructor(
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {

  }
  openAddOS() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px'
    };


    const dialogRef = this.dialog.open(ModalServicoComponent,{
      data: {
        OS: this.novaOs
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
