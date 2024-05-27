import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EmpresaRequest} from "../../../models/request/empresa-request.model";
import {ModalClienteComponent} from "../clientes/modal/modal-cliente/modal-cliente.component";
import {ModalFornecedorComponent} from "./modal/modal-fornecedor/modal-fornecedor.component";

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit{

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openAddFornecedor() {
    let data: EmpresaRequest = {
      idFornecedor: '',
      nome: '',
      cnpj: '',
      fantasia: '',
      responsavel: '',
      inscricaoEstadual: '',
      contato1: '',
      contato2: '',
      email: '',
      isFornecedor: true,
      cep: '',
      logradouro: '',
      bairro: '',
      numero: '',
      cidade: '',
      estado: '',
      complemento: ''
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };


    const dialogRef = this.dialog.open(ModalFornecedorComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
