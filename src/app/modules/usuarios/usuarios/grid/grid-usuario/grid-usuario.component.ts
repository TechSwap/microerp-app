import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {UsuariosResponse} from "../../../../../models/response/usuarios-response.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Metadata} from "../../../../../models/resultlist";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../../services/notification.service";
import {UsuariosService} from "../../../../../services/usuarios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Fornecedor} from "../../../../../models/response/fornecedor-response.model";

@Component({
  selector: 'app-grid-usuario',
  templateUrl: './grid-usuario.component.html',
  styleUrls: ['./grid-usuario.component.css']
})
export class GridUsuarioComponent extends BaseComponent implements OnInit {

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  displayedColumns: string[] = [
    'nome',
    'email',
    'departamento',
    'ativo',
    'actions',
  ];

  usuarios!: MatTableDataSource<UsuariosResponse>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  constructor(
    public dialog: MatDialog,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    private usuariosService: UsuariosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listaUsuarios(this.metaData)
  }

  listaUsuarios(metadata: Metadata) {
    this.loading.show();

    this.usuariosService.listaUsuarios(this.metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.loadGrid(result.data,  result.metaData?.totalRecords)
          } else {
            this.usuarios = new MatTableDataSource<UsuariosResponse>();
            this.notification.warning('Erro ao Listar');
          }
        }else {
          this.usuarios = new MatTableDataSource<UsuariosResponse>()
        }
        this.loading.hide();
      },
      (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    );
  }

  public loadGrid(data: UsuariosResponse[], totalRecords: number | undefined ) {
    this.usuarios = new MatTableDataSource<UsuariosResponse>(data);
    this.totalRecords = totalRecords != 0 ?  totalRecords : 0
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.listaUsuarios(metaData)
  }

  activeUsuario(user: UsuariosResponse) {
    console.info("Active: ", user)
    this.loading.show();
    this.usuariosService.activeUser(user.userId).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.listaUsuarios(this.metaData)
          this.notification.success('Atualizado com sucesso !')
        }
        this.loading.hide();
      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao ativar/inativar .')
      })
  }

  deleteUsuario(user: UsuariosResponse) {
    console.info("Delete: ", user)
    this.loading.show();
    this.usuariosService.deleteUser(user.userId).subscribe(
      (result) => {
        if (result.statusCode === 204) {
          this.listaUsuarios(this.metaData)
          this.notification.success('Deletado com sucesso !')
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
        this.notification.warning('Erro ao deletar .')
      })
  }
}
