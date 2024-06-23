import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Fornecedor} from "../../../../../models/response/fornecedor-response.model";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../../../../models/response/cliente-response.model";
import {Departamento} from "../../../../../models/response/departamento-response.model";
import {Metadata} from "../../../../../models/resultlist";
import {NotificationService} from "../../../../../services/notification.service";
import {DepartamentosService} from "../../../../../services/departamentos.service";
import {ModalClienteComponent} from "../../../clientes/modal/modal-cliente/modal-cliente.component";
import {ModalResult} from "../../../../../models/modal-result.model";
import {ModalDepartamentosComponent} from "../../modal/modal-departamentos/modal-departamentos.component";

@Component({
  selector: 'app-grid-departamentos',
  templateUrl: './grid-departamentos.component.html',
  styleUrls: ['./grid-departamentos.component.css']
})
export class GridDepartamentosComponent implements OnInit{

  displayedColumns: string[] = ['nome', 'responsavel', 'centroCusto', 'status', 'actions'];
  departamentos!: MatTableDataSource<Departamento>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  constructor(
    private departamentoService: DepartamentosService,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.listDepartamento(this.metaData)

  }

  listDepartamento(metaData: Metadata) {
    this.loading.show();

    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadGridDepartamento(result.data, result.metaData.totalRecords)
        } else {
          this.notification.warning('Erro ao Listar');
        }
        this.loading.hide();
      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      })

  }

  public loadGridDepartamento(list: Departamento[], totalRecords: number | undefined ) {
    this.departamentos = new MatTableDataSource<Departamento>(list.sort((a, b) => a.descricao.localeCompare(b.descricao)))
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  editDepartamento(departamento: Departamento) {
    this.loading.show();
    this.departamentoService.findOne(departamento.idDepartamento).subscribe(
      (result) => {
        console.info('Departamento:', result);
        if (result.statusCode === 200) {
          this.loading.hide();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.disableClose = true;
          dialogConfig.data = {
            width: '700px',
            dados: result.data
          };
          const dialogRef = this.dialog.open(ModalDepartamentosComponent, dialogConfig)

          dialogRef.afterClosed().subscribe((result: ModalResult) => {
            if(result.success) {
              this.notification.success('Cliente atualizado com sucesso.')
              this.listDepartamento(this.metaData)
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

  deleteDepartamento(departamento: Departamento) {
    this.loading.show();
    this.departamentoService.delete(departamento.idDepartamento).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.listDepartamento(this.metaData)
          this.notification.success('Deletado com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao deletar.')
      })

  }

  activeDepartamento(departamento: Departamento) {
    this.loading.show();
    this.departamentoService.active(departamento.idDepartamento).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.listDepartamento(this.metaData)
          this.notification.success('Atualizado com sucesso!')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao atualizar.')
      })
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.listDepartamento(metaData)
  }

}
