import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { OrdemServicoResponse } from 'src/app/models/response/ordem-servico-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { OrdemServicosService } from 'src/app/services/ordem-servicos.service';
import {ModalServicoComponent} from "../../modal/modal-servico/modal-servico.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-grid-servicos',
  templateUrl: './grid-servicos.component.html',
  styleUrls: ['./grid-servicos.component.css'],
})
export class GridServicosComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroOS',
    'cliente',
    'solicitante',
    'valorTotal',
    'itens',
    'dataPrevisaoEntrega',
    'actions',
  ];
  servicos!: MatTableDataSource<OrdemServicoResponse>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  constructor(
    private ordemServicosService: OrdemServicosService,
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 15,
    }
    this.getListaOs(metaData);
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaOs(metaData)
  }

  getListaOs(metaData: Metadata) {
    this.loading.show();

    this.ordemServicosService.listaOs(metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.servicos = new MatTableDataSource<OrdemServicoResponse>(result.data);
            this.totalRecords = result.metaData?.totalRecords != 0 ?  result.metaData?.totalRecords : 0
          } else {
            this.servicos = new MatTableDataSource<OrdemServicoResponse>();
            this.toastrService.warning('Erro ao Listar', 'Atenção!');
          }
        }else {
          this.servicos = new MatTableDataSource<OrdemServicoResponse>()
        }
        this.loading.hide();
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  editOrdem(servico: OrdemServicoResponse) {
    this.ordemServicosService.getOneOs(servico.idOrdemServico).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          const dialogRef = this.dialog.open(ModalServicoComponent,{
            data: {
              OS:result.data
            }
          });
          dialogRef.afterClosed().subscribe((result) => {
            if(result.success) {
              let metaData: Metadata = {
                pageNumber: 1,
                pageSize: 15,
              }
              this.getListaOs(metaData)
            }
          });

        } else {
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
        this.loading.hide();
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  removerOrdem(servico: OrdemServicoResponse) {
    alert('Remover ' + servico.idOrdemServico);
  }
}
