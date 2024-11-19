import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {Funcionario} from "../../../../../models/response/funcionario.model";
import {Maquina} from "../../../../../models/response/maquina.model";
import {Metadata} from "../../../../../models/resultlist";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MaquinasService} from "../../../../../services/maquinas.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Cliente} from "../../../../../models/response/cliente-response.model";
import {NotificationService} from "../../../../../services/notification.service";

@Component({
  selector: 'app-grid-maquina',
  templateUrl: './grid-maquina.component.html',
  styleUrls: ['./grid-maquina.component.css']
})
export class GridMaquinaComponent extends BaseComponent implements  OnInit {
  displayedColumns: string[] = ['numeroSerie', 'descricao', 'fabricante', 'status', 'actions'];
  maquinas!: MatTableDataSource<Maquina>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 10,
  }

  totalRecords? = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    private maquinaService: MaquinasService
  ) {
    super();
  }
  ngOnInit(): void {
    this.getMaquinas(this.metaData)
  }

  getMaquinas(metaData: Metadata) {
    this.loading.show();
    this.maquinaService.listMaquinas(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadGriMaquinas(result.data, result.metaData.totalRecords)
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
      })
  }

  public loadGriMaquinas(list: Maquina[], totalRecords: number | undefined) {
    this.maquinas = new MatTableDataSource<Maquina>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getMaquinas(metaData)
  }

  activeMaquina(maquina: Maquina) {
    this.loading.show();
    this.maquinaService.activeMaquina(maquina).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getMaquinas(this.metaData)
          this.notification.success('Atualizado com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao atualizar.')
      })
  }

  sellMaquina(maquina: Maquina) {
    this.loading.show();
    this.maquinaService.sellMaquina(maquina).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getMaquinas(this.metaData)
          this.notification.success('Vendida com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao vender.')
      })
  }

  deleteMaquina(maquina: Maquina) {
    this.loading.show();
    this.maquinaService.deleteMaquina(maquina).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getMaquinas(this.metaData)
          this.notification.success('Excluir com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao excluir.')
      })
  }

}
