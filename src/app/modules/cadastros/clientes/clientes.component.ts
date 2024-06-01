import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaRequest } from 'src/app/models/request/empresa-request.model';
import { ModalClienteComponent } from './modal/modal-cliente/modal-cliente.component';
import {Metadata} from "../../../models/resultlist";
import {ClientesService} from "../../../services/clientes.service";
import {Cliente} from "../../../models/response/cliente-response.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {GridClienteComponent} from "./grid/grid-cliente/grid-cliente.component";
import {SelectModel} from "../../../models/SelectModel";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  dropClientes: SelectModel[] =  []

  @ViewChild('GridClienteComponent')
  gridClienteComponent!: GridClienteComponent;

  searchClienteForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
    'cnpj': [''],
    'contato': [''],
    'email': ['']
  })


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.getListaClientes()
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

  searchClientes() {

    let dados = this.searchClienteForm.value;
    console.info('Search Clientes: ', dados)

    this.clienteService.searchClientes(dados.idCliente, dados.cnpj, dados.contato, dados.email).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.gridClienteComponent.loadGrid(result.data, result.metaData.totalRecords)
        } else {

        }
      },
      (error) => {

      }
    );
  }

  getListaClientes() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadDropClientes(result.data)
        } else {

        }
      },
      (error) => {

      }
    );
  }

  loadDropClientes(clientes: Cliente[]) {

    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    this.dropClientes.push(firstPosition)

    clientes.forEach(cliente => {
      this.dropClientes.push({
        Id: cliente.idCliente,
        Descricao: cliente.nome
      });
    });

  }

}
