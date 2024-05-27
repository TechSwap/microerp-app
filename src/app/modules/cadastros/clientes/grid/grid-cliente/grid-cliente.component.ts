import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { ClientesService } from 'src/app/services/clientes.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalClienteComponent} from "../../modal/modal-cliente/modal-cliente.component";

@Component({
  selector: 'app-grid-cliente',
  templateUrl: './grid-cliente.component.html',
  styleUrls: ['./grid-cliente.component.css']
})
export class GridClienteComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'fantasia', 'contato1', 'email', 'ativo', 'actions'];
  clientes!: MatTableDataSource<Cliente>;

  resultsLength = 0;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(
    private clienteService: ClientesService,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 15,
    }

    this.getListaClientes(metaData)
  }

  getListaClientes(metaData: Metadata) {

    this.loading.show();

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.clientes = new MatTableDataSource<Cliente>(result.data)
          this.totalRecords = result.metaData?.totalRecords != 0 ?  result.metaData?.totalRecords : 0
        } else {
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
        this.loading.hide();

      }, (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      })
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaClientes(metaData)
  }


  edit(cliente: Cliente) {
    console.info('Row: ', cliente)
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

          dialogRef.afterClosed().subscribe(result => {

          });
        }
      },
      (error) => {
        this.loading.hide();
        console.info('Error Load Modal Cliente: ', error)
      }
    )

   }

  delete(row: any) {
    console.info('Row: ', row)
  }

  active(row: any) {
    console.info('Row: ', row)
  }

}
