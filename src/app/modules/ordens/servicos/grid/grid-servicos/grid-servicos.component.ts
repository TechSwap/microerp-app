import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrdemServicoResponse } from 'src/app/models/response/ordem-servico-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { OrdemServicosService } from 'src/app/services/ordem-servicos.service';
import {ModalServicoComponent} from "../../modal/modal-servico/modal-servico.component";
import {MatDialog} from "@angular/material/dialog";
import {ExcelService} from "src/app/services/excel.service";

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

  headersColumns: string[] = [
    'NumeroOS',
    'Cliente',
    'Solicitante',
    'ValorTotal',
    'Itens',
    'DataPrevisaoEntrega'
  ];
  servicos!: MatTableDataSource<OrdemServicoResponse>;

  jsonServicos: OrdemServicoResponse[] = []

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  constructor(
    private ordemServicosService: OrdemServicosService,
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private excelService: ExcelService,
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
            this.loadGrid(result.data,  result.metaData?.totalRecords)
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

  public loadGrid(data: OrdemServicoResponse[], totalRecords: number | undefined ) {
    this.servicos = new MatTableDataSource<OrdemServicoResponse>(data);
    this.totalRecords = totalRecords != 0 ?  totalRecords : 0
    this.jsonServicos = data
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

  public exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.jsonServicos,  'OrdemServico');
  }
}
