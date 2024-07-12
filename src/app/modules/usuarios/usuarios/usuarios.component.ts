import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/base/base.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalClienteComponent} from "../../cadastros/clientes/modal/modal-cliente/modal-cliente.component";
import {UserRequest} from "../../../models/request/user-request.model";
import {ModalUsuarioComponent} from "./modal/modal-usuario/modal-usuario.component";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent extends BaseComponent implements OnInit {

  searchUsuarioForm: FormGroup = this.formBuilder.group({
    'nome': [''],
    'email': ['']
  })

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  addUsuario() {

    let data: UserRequest = {
      userId : '',
      nome: '',
      idDepartamento: '',
      email: '',
      ativo: true,
      senha: '',
      confirmarSenha: ''
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };


    const dialogRef = this.dialog.open(ModalUsuarioComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {

    });

  }

}
