import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  resultsLength = 0;

  constructor(
    private ordemServicosService: OrdemServicosService,
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getListaOs();
  }

  getListaOs() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 20,
    };

    this.loading.show();

    this.ordemServicosService.listaOs(metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.servicos = new MatTableDataSource<OrdemServicoResponse>(
              result.data
            );
          } else {
            this.servicos = new MatTableDataSource<OrdemServicoResponse>();

            console.info('Erro ao Listar: ', result.errors);
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

          dialogRef.afterClosed().subscribe(result => {

          });

        } else {
          console.info('Erro ao Listar: ', result.errors);
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
