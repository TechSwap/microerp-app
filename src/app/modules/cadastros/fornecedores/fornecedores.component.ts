import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EmpresaRequest} from "../../../models/request/empresa-request.model";
import {ModalClienteComponent} from "../clientes/modal/modal-cliente/modal-cliente.component";
import {ModalFornecedorComponent} from "./modal/modal-fornecedor/modal-fornecedor.component";
import { BaseComponent } from '../../shared/base/base.component';
import {SelectModel} from "../../../models/SelectModel";
import {Metadata} from "../../../models/resultlist";
import {FornecedoresService} from "../../../services/fornecedores.service";
import {GridClienteComponent} from "../clientes/grid/grid-cliente/grid-cliente.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import { GridFornecedorComponent } from './grid/grid-fornecedor/grid-fornecedor.component';
import {NotificationService} from "../../../services/notification.service";
import {ModalResult} from "../../../models/modal-result.model";

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent extends BaseComponent implements OnInit{

  @ViewChild('GridFornecedorComponent')
  gridClienteComponent!: GridFornecedorComponent;

  searchFornecedorForm: FormGroup = this.formBuilder.group({
    'idFornecedor': [''],
    'cnpj': [''],
    'contato': [''],
    'email': ['']
  })

  dropFornecedores: SelectModel[] = []
  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 200,
  };

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedoresService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaFornecedores()
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

    dialogRef.afterClosed().subscribe((result: ModalResult) => {
       if(result.success) {
         this.getListaFornecedores()
         this.notification.success(result.msg)
       }
    });
  }

  getListaFornecedores() {
    this.fornecedorService.listFornecedores(this.metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropFornecedores = this.loadDropFornecedor(result.data, this.dropFornecedores)
        }
      },
      (error) => {
      }
    );
  }




}
