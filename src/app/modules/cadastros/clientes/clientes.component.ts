import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaRequest } from 'src/app/models/request/empresa-request.model';
import { ModalClienteComponent } from './modal/modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  openAddCliente() {
    let data: EmpresaRequest = {
        idCliente: '',
        nome: '',
        cnpj: '',
        fantasia: '',
        responsavel: '',
        inscricaoEstadual: '',
        contato1: '',
        contato2: '',
        email: '',
        isCliente: true,
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


    const dialogRef = this.dialog.open(ModalClienteComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
