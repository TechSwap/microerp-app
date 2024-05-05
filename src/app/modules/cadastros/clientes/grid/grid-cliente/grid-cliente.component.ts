import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-grid-cliente',
  templateUrl: './grid-cliente.component.html',
  styleUrls: ['./grid-cliente.component.css']
})
export class GridClienteComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'contato1', 'email', 'ativo', 'actions'];
  clientes!: MatTableDataSource<Cliente>;

  resultsLength = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    private clienteService: ClientesService,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService
  ) {  }

  ngOnInit() {
    this.getListaClientes()
  }

  getListaClientes() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 20,
    }

    this.loading.show();

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.clientes = new MatTableDataSource<Cliente>(result.data)
        } else {
          console.info('Erro ao Listar: ', result.errors)
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
        this.loading.hide();

      }, (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      })
  }


  edit(row: any) {
    console.info('Row: ', row)
   }

  delete(row: any) {
    console.info('Row: ', row)
  }

  active(row: any) {
    console.info('Row: ', row)
  }

}
