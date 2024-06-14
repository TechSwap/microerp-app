import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {Funcionario} from "../../../../../models/response/funcionario.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Metadata} from "../../../../../models/resultlist";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FuncionariosService} from "../../../../../services/funcionarios.service";
import {ModalFuncionarioComponent} from "../../modal/modal-funcionario/modal-funcionario.component";

@Component({
  selector: 'app-grid-funcionario',
  templateUrl: './grid-funcionario.component.html',
  styleUrls: ['./grid-funcionario.component.css']
})
export class GridFuncionarioComponent extends BaseComponent implements  OnInit {
  displayedColumns: string[] = ['nome', 'departamento', 'funcao', 'ativo', 'actions'];
  funcionarios!: MatTableDataSource<Funcionario>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  constructor(
    private loading: NgxSpinnerService,
    public dialog: MatDialog,
    private funcionarioService: FuncionariosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaFuncionarios(this.metaData)
  }

  getListaFuncionarios(metaData: Metadata) {
    this.loading.show();
    this.funcionarioService.listFuncionarios(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadGridFuncionarios(result.data, result.metaData.totalRecords)
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
      })
  }

  public loadGridFuncionarios(list: Funcionario[], totalRecords: number | undefined) {
    this.funcionarios = new MatTableDataSource<Funcionario>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  editFuncionario(func: Funcionario) {
    this.loading.show();
    this.funcionarioService.findOneFuncionario(func.idFuncionario).subscribe(
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
          const dialogRef = this.dialog.open(ModalFuncionarioComponent, dialogConfig)

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

  activeFuncionario(func: Funcionario) {
    this.loading.show();
    this.funcionarioService.activeFuncionario(func.idFuncionario).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaFuncionarios(this.metaData)
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
      })
  }

  deleteFuncionario(func: Funcionario) {
    this.loading.show();
    this.funcionarioService.deleteFuncionario(func.idFuncionario).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaFuncionarios(this.metaData)
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
      })
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaFuncionarios(metaData)
  }

}
