import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {OrdemProducaoResponse} from "../../../../../models/response/ordem-producao-response.model";
import {Metadata} from "../../../../../models/resultlist";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {OrdemProducaoService} from "../../../../../services/ordem-producao.service";

@Component({
  selector: 'app-grid-producao',
  templateUrl: './grid-producao.component.html',
  styleUrls: ['./grid-producao.component.css']
})
export class GridProducaoComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroOP',
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
    private loading: NgxSpinnerService,
    private toastrService: ToastrService
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
        console.info('Result List', result)
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

}
