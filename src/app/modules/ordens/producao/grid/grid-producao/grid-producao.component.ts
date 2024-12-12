import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {OrdemProducaoResponse} from "../../../../../models/response/ordem-producao-response.model";
import {Metadata} from "../../../../../models/resultlist";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {OrdemProducaoService} from "../../../../../services/ordem-producao.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalServicoComponent} from "../../../servicos/modal/modal-servico/modal-servico.component";
import {StartOrdemComponent} from "../../modal/start-ordem/start-ordem.component";
import { FinallyOrdemComponent } from '../../modal/finally-ordem/finally-ordem.component';
import { CancellyOrdemComponent } from '../../modal/cancelly-ordem/cancelly-ordem.component';

@Component({
  selector: 'app-grid-producao',
  templateUrl: './grid-producao.component.html',
  styleUrls: ['./grid-producao.component.css']
})
export class GridProducaoComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'cliente',
    'numeroOS',
    'itens',
    'status',
    'actions',
  ];
  servicos!: MatTableDataSource<OrdemProducaoResponse>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 10,
  }

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
      this.getListaOps(this.metaData)
  }

  public loadGrid(data: OrdemProducaoResponse[], totalRecords: number | undefined ) {
    this.servicos = new MatTableDataSource<OrdemProducaoResponse>(data);
    this.totalRecords = totalRecords != 0 ?  totalRecords : 0
  }

  getListaOps(metaData: Metadata) {
    this.loading.show();
    this.ordemProducaoService.listaOps(metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.loadGrid(result.data,  result.metaData?.totalRecords)
          } else {
            this.servicos = new MatTableDataSource<OrdemProducaoResponse>();
            this.toastrService.warning('Erro ao Listar', 'Atenção!');
          }
        }else {
          this.servicos = new MatTableDataSource<OrdemProducaoResponse>()
        }
        this.loading.hide();
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaOps(metaData)
  }

  editOp(servico: OrdemProducaoResponse) {
    let id = servico.idOrdemProducao
    this.router.navigateByUrl(`/ordemProducao/${id}`)
  }

  startOp(servico: OrdemProducaoResponse) {
    if(servico.itensDesc.length > 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        width: '700px'
      };

      let data = {
        idOrdemProducao: servico.idOrdemProducao,
        itensDesc: servico.itensDesc
      }

      const dialogRef = this.dialog.open(StartOrdemComponent,{
        data: {
          Itens: data
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
          let metaData: Metadata = {
            pageNumber: 1,
            pageSize: 10,
          }
          this.getListaOps(metaData)
      });
    }else {
      this.toastrService.warning('Nao há itens nesta Ordem')
    }
  }

  finallyOp(servico: OrdemProducaoResponse) {    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px'
    };

    let data = {
      idOrdemProducao: servico.idOrdemProducao,
      itensDesc: servico.itensDesc
    }

    const dialogRef = this.dialog.open(FinallyOrdemComponent,{
      data: {
        Itens: data
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
        let metaData: Metadata = {
          pageNumber: 1,
          pageSize: 10,
        }
        this.getListaOps(metaData)
    }); 
  }

  cancellyOp(servico: OrdemProducaoResponse) {    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px'
    };

    let data = {
      idOrdemProducao: servico.idOrdemProducao,
      itensDesc: servico.itensDesc
    }

    const dialogRef = this.dialog.open(CancellyOrdemComponent,{
      data: {
        Itens: data
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
        let metaData: Metadata = {
          pageNumber: 1,
          pageSize: 10,
        }
        this.getListaOps(metaData)
    }); 
  }


  loadData() {

  }
}
