import {Component, Inject, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../../../../services/notification.service";
import {UserRequest} from "../../../../../models/request/user-request.model";
import {SelectModel} from "../../../../../models/SelectModel";
import {Metadata} from "../../../../../models/resultlist";
import {DepartamentosService} from "../../../../../services/departamentos.service";
import {EmpresaRequest} from "../../../../../models/request/empresa-request.model";
import {ModalResult} from "../../../../../models/modal-result.model";
import {UsuariosService} from "../../../../../services/usuarios.service";

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent extends BaseComponent implements OnInit {
  isUpdate: boolean = false
  hide = true;
  hidec = true;

  userForm: FormGroup = this.formBuilder.group({
    'userId': [''],
    'nome': ['', Validators.required],
    'email': ['', Validators.required],
    'departamentoId': [''],
    'senha': [''],
    'confirmarSenha': [''],
    'ativo': [''],
  })

  dropDepartamentos: SelectModel[] = []

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 200,
  }

  constructor(
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    private departamentoService: DepartamentosService,
    private usuarioService: UsuariosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData(this.data.dados)
    this.listDepartamentos(this.metaData)
  }

  loadData(dados: UserRequest){
    this.isUpdate = !!dados.userId
    this.userForm.controls['userId'].setValue(dados.userId)
    this.userForm.controls['nome'].setValue(dados.nome)
    this.userForm.controls['email'].setValue(dados.email)
    this.userForm.controls['departamentoId'].setValue(dados.idDepartamento)
    this.userForm.controls['senha'].setValue(dados.senha)
    this.userForm.controls['confirmarSenha'].setValue(dados.confirmarSenha)
    this.userForm.controls['ativo'].setValue(dados.ativo)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.loading.show();
    let dados = this.userForm.value;

    let req: UserRequest = {
      userId: dados.userId,
      nome: dados.nome,
      email: dados.email,
      idDepartamento: dados.departamentoId,
      senha: dados.senha,
      confirmarSenha: dados.confirmarSenha,
      ativo: dados.ativo
    }

    if(req.userId === '') {
      this.usuarioService.addUsuario(req).subscribe((result) => {
        if (result.statusCode === 204) {
          this.loading.hide();
          this.dialogRef.close({
            success: true
          });
        } else {
          this.loading.hide();
        }
      }, (error) => {
        if (error.status === 400 || error.status === 404) {
          let msg = error.error.errors[0].userMessage
          this.notification.error(msg)
        }
        this.loading.hide();
      })
    }else{
      this.usuarioService.updateUsuario(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.loading.hide();
            let resultModal: ModalResult = {
              success: true,
              msg: result.msg
            }
            this.dialogRef.close(resultModal);
          }
        },
        (error) => {
          console.info('Error Update Cliente: ', error)
          this.loading.hide();
        }
      )
    }
  }

  listDepartamentos(metaData: Metadata) {
    this.loading.show();
    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropDepartamentos = this.loadDropDepartamento(result.data, this.dropDepartamentos)
        } else {
          this.notification.warning('Erro ao Listar');
        }
        this.loading.hide();
      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    )
  }

}
