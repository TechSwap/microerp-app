import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../shared/base/base.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalClienteComponent} from "../../cadastros/clientes/modal/modal-cliente/modal-cliente.component";
import {UserRequest} from "../../../models/request/user-request.model";
import {ModalUsuarioComponent} from "./modal/modal-usuario/modal-usuario.component";
import {NotificationService} from "../../../services/notification.service";
import {GridFuncionarioComponent} from "../../cadastros/funcionarios/grid/grid-funcionario/grid-funcionario.component";
import {GridUsuarioComponent} from "./grid/grid-usuario/grid-usuario.component";
import {Metadata} from "../../../models/resultlist";
import {MatTableDataSource} from "@angular/material/table";
import {UsuariosResponse} from "../../../models/response/usuarios-response.model";
import {NgxSpinnerService} from "ngx-spinner";
import {UsuariosService} from "../../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent extends BaseComponent implements OnInit {
  @ViewChild('GridUsuarioComponent')
  gridUsuarioComponent!: GridUsuarioComponent;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  searchUsuarioForm: FormGroup = this.formBuilder.group({
    'nome': [''],
    'email': ['']
  })

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private loading: NgxSpinnerService,
    private usuarioService: UsuariosService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  addUsuario() {
    let data: UserRequest = {
      userId : '',
      nome: '',
      idDepartamento: '',
      email: '',
      ativo: true,
      senha: '',
      confirmarSenha: ''
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };
    const dialogRef = this.dialog.open(ModalUsuarioComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.notification.success('Adicionado com sucesso')
        this.listaUsuarios(this.metaData)
      }
    });
  }

  listaUsuarios(metadata: Metadata) {
    this.loading.show();
    this.usuarioService.listaUsuarios(this.metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.gridUsuarioComponent.loadGridUsuario(result.data, result.metaData?.totalRecords)
          }
        }
        this.loading.hide();
      },
      (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    );
  }

  searchUsuarios() {
    let dados = this.searchUsuarioForm.value;
    console.info('Search Users: ', dados)
    this.loading.show();

    this.usuarioService.searchUsuarios(dados.nome, dados.email,this.metaData).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200 && result.data.length > 0) {
            this.gridUsuarioComponent.loadGridUsuario(result.data, result.metaData?.totalRecords)
          }
        }
        this.loading.hide();
      },
      (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    );
  }

}
