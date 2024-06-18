import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { ClientesService } from 'src/app/services/clientes.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalClienteComponent} from "../../modal/modal-cliente/modal-cliente.component";
import {NotificationService} from "../../../../../services/notification.service";
import {ModalResult} from "../../../../../models/modal-result.model";

@Component({
  selector: 'app-grid-cliente',
  templateUrl: './grid-cliente.component.html',
  styleUrls: ['./grid-cliente.component.css']
})
export class GridClienteComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'fantasia', 'contato1', 'email', 'ativo', 'actions'];
  clientes!: MatTableDataSource<Cliente>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(
    private clienteService: ClientesService,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.getListaClientes(this.metaData)
  }

  getListaClientes(metaData: Metadata) {
    this.loading.show();

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadGrid(result.data, result.metaData.totalRecords)
        } else {
          this.notification.warning('Erro ao Listar');
        }
        this.loading.hide();

      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      })
  }

  public loadGrid(list: Cliente[], totalRecords: number | undefined ) {
    this.clientes = new MatTableDataSource<Cliente>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }

    this.getListaClientes(metaData)
  }


  editCliente(cliente: Cliente) {
    this.loading.show();
    this.clienteService.findOneCliente(cliente.idCliente).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loading.hide();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.disableClose = true;
          dialogConfig.data = {
            width: '700px',
            dados: result.data
          };
          const dialogRef = this.dialog.open(ModalClienteComponent, dialogConfig)

          dialogRef.afterClosed().subscribe((result: ModalResult) => {
            if(result.success) {
              this.notification.success('Cliente atualizado com sucesso.')
              this.getListaClientes(this.metaData)
            }
          });
        }
      },
      (error) => {
        this.loading.hide();
        console.info('Error Load Modal Cliente: ', error)
      }
    )
   }

  deleteCliente(cliente: Cliente) {
    this.loading.show();
    this.clienteService.deleteCliente(cliente.idCliente).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaClientes(this.metaData)
          this.notification.success('Deletado com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao deletar.')
    })
  }

  activeCliente(cliente: Cliente) {
    this.loading.show();
    this.clienteService.activeCliente(cliente.idCliente).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaClientes(this.metaData)
          this.notification.success('Atualizado com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao atualizar.')
      })
  }
}
