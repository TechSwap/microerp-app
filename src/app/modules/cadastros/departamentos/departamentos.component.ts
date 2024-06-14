import {Component, OnInit} from '@angular/core';
import {EmpresaRequest} from "../../../models/request/empresa-request.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalClienteComponent} from "../clientes/modal/modal-cliente/modal-cliente.component";
import {Departamento} from "../../../models/response/departamento-response.model";
import {FormBuilder} from "@angular/forms";
import {ModalDepartamentosComponent} from "./modal/modal-departamentos/modal-departamentos.component";

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit{


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
  }
    ngOnInit(): void {

    }

  openModalDepartamento() {
    let data: Departamento = {
      idDepartamento: '',
      descricao: '',
      responsavel: '',
      centroCusto: '',
      status: true
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };


    const dialogRef = this.dialog.open(ModalDepartamentosComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
