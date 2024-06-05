import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalServicoComponent } from './modal/modal-servico/modal-servico.component';
import {OrdemServicoModel} from "../../../models/ordemServico.model";
import {GridServicosComponent} from "./grid/grid-servicos/grid-servicos.component";
import {Metadata} from "../../../models/resultlist";
import {Cliente} from "../../../models/response/cliente-response.model";
import {ClientesService} from "../../../services/clientes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {OrdemServicosService} from "../../../services/ordem-servicos.service";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  clientes: Cliente[] = [];

  @ViewChild(GridServicosComponent) gridComponent!: any;

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
    Detalhes: []
  }

  searchOsForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
    'solicitante': [''],
    'dataLancamento': ['']
  })

  constructor(
    private clienteService: ClientesService,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private ordemServicosService: OrdemServicosService,
    public dialog: MatDialog
  ) {
    this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy
  }


  ngOnInit(): void {
    this.getListaClientes()
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

    dialogRef.afterClosed().subscribe((result) => {
      if(result.success) {
        let metaData: Metadata = {
          pageNumber: 1,
          pageSize: 15,
        }
        this.gridComponent.getListaOs(metaData)
      }
    });
  }

  getListaClientes() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.clientes = result.data
        }
      },
      (error) => {

      }
    );
  }

  searchOs() {
    let dados = this.searchOsForm.value

    this.ordemServicosService.searchOs(dados.idCliente, dados.solicitante, dados.dataLancamento).subscribe(
      (result) => {
        console.info('Result: ', result)
        if (result.statusCode === 200) {
          this.gridComponent.loadGrid(result.data, result.metaData?.totalRecords)
        } else {
          this.gridComponent.loadGrid([], 0)
        }
      },
      (error) => {
        this.gridComponent.loadGrid([], 0)
      }
    );
  }

  protected readonly encodeURI = encodeURI;
}
