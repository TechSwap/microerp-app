import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../../../../models/response/cliente-response.model";
import {Metadata} from "../../../../../models/resultlist";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Fornecedor} from "../../../../../models/response/fornecedor-response.model";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalClienteComponent} from "../../../clientes/modal/modal-cliente/modal-cliente.component";
import {ModalFornecedorComponent} from "../../modal/modal-fornecedor/modal-fornecedor.component";
import {NotificationService} from "../../../../../services/notification.service";
import {ModalResult} from "../../../../../models/modal-result.model";

@Component({
  selector: 'app-grid-fornecedor',
  templateUrl: './grid-fornecedor.component.html',
  styleUrls: ['./grid-fornecedor.component.css']
})
export class GridFornecedorComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'fantasia', 'contato1', 'email', 'ativo', 'actions'];
  fornecedores!: MatTableDataSource<Fornecedor>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(
    private fornecedorService: FornecedoresService,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    public dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.getListaFornecedores(this.metaData)
  }

  getListaFornecedores(metaData: Metadata) {
    this.loading.show();
    this.fornecedorService.listFornecedores(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loadGrid(result.data, result.metaData.totalRecords)
        } else {
          this.notification.warning('Erro ao Listar');
        }
        this.loading.hide();

      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
    })
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaFornecedores(metaData)
  }

  public loadGrid(list: Fornecedor[], totalRecords: number | undefined ) {
    this.fornecedores = new MatTableDataSource<Fornecedor>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  editFornecedor(fornecedor: Fornecedor) {
    this.loading.show();
    this.fornecedorService.getFornecedor(fornecedor.idFornecedor).subscribe(
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
          const dialogRef = this.dialog.open(ModalFornecedorComponent, dialogConfig)

          dialogRef.afterClosed().subscribe((result: ModalResult) => {
            if(result.success) {
              this.notification.success('Fornecedor atualizado com sucesso.')
              this.getListaFornecedores(this.metaData)
            }
          });
        }
      },
      (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao tentar editar.')
      }
    )
  }

  activeFornecedor(fornecedor: Fornecedor) {
    this.loading.show();
    this.fornecedorService.activeFornecedor(fornecedor.idFornecedor).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaFornecedores(this.metaData)
          this.notification.success('Atualizado com sucesso !')
        }
        this.loading.hide();
      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao ativar/inativar .')
    })
  }

  deleteFornecedor(fornecedor: Fornecedor) {
    this.loading.show();
    this.fornecedorService.deleteFornecedor(fornecedor.idFornecedor).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.getListaFornecedores(this.metaData)
          this.notification.success('Deletado com sucesso !')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao deletar .')
    })
  }
}
