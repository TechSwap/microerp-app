import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {EmpresaRequest} from "../../../../../models/request/empresa-request.model";
import {ModalResult} from "../../../../../models/modal-result.model";
import {Departamento} from "../../../../../models/response/departamento-response.model";
import {DepartamentosService} from "../../../../../services/departamentos.service";
import {NotificationService} from "../../../../../services/notification.service";

@Component({
  selector: 'app-modal-departamentos',
  templateUrl: './modal-departamentos.component.html',
  styleUrls: ['./modal-departamentos.component.css']
})
export class ModalDepartamentosComponent implements OnInit{

  isUpdate: boolean = false
  departamentoForm: FormGroup = this.formBuilder.group({
    'idDepartamento': [''],
    'descricao': ['', Validators.required],
    'responsavel': ['', Validators.required],
    'centroCusto': [''],
    'status': [true]
  })

  constructor(
    public dialogRef: MatDialogRef<ModalDepartamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    private departamentoService: DepartamentosService
  ) {
  }

  ngOnInit(): void {
    console.info('LoadModal: ', this.data.dados)
    this.loadData(this.data.dados)
    this.isUpdate = this.data.dados.idDepartamento !== ''
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  loadData(dados: any) {
    this.departamentoForm.controls['idDepartamento'].setValue(dados.idDepartamento)
    this.departamentoForm.controls['status'].setValue(dados.status)
    this.departamentoForm.controls['descricao'].setValue(dados.descricao)
    this.departamentoForm.controls['responsavel'].setValue(dados.responsavel)
    this.departamentoForm.controls['centroCusto'].setValue(dados.centroCusto)
  }


  onSubmit(): void {
    this.loading.show();
    let dados = this.departamentoForm.value;

    let req: Departamento = {
      idDepartamento: dados.idDepartamento,
      descricao: dados.descricao,
      responsavel: dados.responsavel,
      centroCusto: dados.centroCusto,
      status: dados.status
    }

    if (req.idDepartamento === '') {
      this.departamentoService.post(req).subscribe((result) => {
        console.info('Result: ', result)
        if (result.statusCode === 204) {
          this.loading.hide();
          let resultModal: ModalResult = {
            success: true,
            msg: result.msg
          }
          this.dialogRef.close(resultModal);
        } else {
          this.notification.warning(result.msg);
          this.loading.hide();
        }
      }, (error) => {
        if (error.status === 400 || error.status === 404) {
          let msg = error.error.errors[0].userMessage
          this.notification.warning(msg);
        }
        this.loading.hide();
      })
    } else {
      this.departamentoService.put(req).subscribe(
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
          this.notification.warning('Erro ao atualizar ');
          this.loading.hide()
        }
      )
    }
  }
}
