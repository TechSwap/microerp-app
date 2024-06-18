import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseService} from "../../../../../services/base.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {EmpresaRequest} from "../../../../../models/request/empresa-request.model";
import {FornecedoresService} from "../../../../../services/fornecedores.service";
import {NotificationService} from "../../../../../services/notification.service";
import {ModalResult} from "../../../../../models/modal-result.model";

@Component({
  selector: 'app-modal-fornecedor',
  templateUrl: './modal-fornecedor.component.html',
  styleUrls: ['./modal-fornecedor.component.css']
})
export class ModalFornecedorComponent implements OnInit{
  isUpdate: boolean = false
  isReadonly: boolean = false

  fornecedorForm: FormGroup = this.formBuilder.group({
    'idFornecedor': [''],
    'nome': ['', Validators.required],
    'cnpj': ['', Validators.required],
    'inscricaoEstadual': [''],
    'fantasia': [''],
    'contato1': [''],
    'contato2': [''],
    'email': [''],
    'responsavel':[''],
    'cep': [''],
    'endereco': [''],
    'numero': [''],
    'bairro': [''],
    'cidade': [''],
    'estado': [''],
    'complemento': ['']
  })

  constructor(
    public dialogRef: MatDialogRef<ModalFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService: BaseService,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private fornecedorService:  FornecedoresService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadData(this.data.dados)
    this.isReadonly = this.data.dados.idFornecedor !== ''
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.loading.show();
    let dados = this.fornecedorForm.value;

    let req: EmpresaRequest = {
      idFornecedor: dados.idFornecedor,
      nome: dados.nome,
      cnpj: dados.cnpj,
      inscricaoEstadual: dados.inscricaoEstadual,
      fantasia: dados.fantasia,
      responsavel: dados.responsavel,
      contato1: dados.contato1,
      contato2: dados.contato2,
      email: dados.email,
      cep: dados.cep,
      logradouro: dados.endereco,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      isFornecedor: true,
      complemento: dados.complemento
    }

    if(req.idFornecedor === '') {
      this.fornecedorService.postFornecdor(req).subscribe((result) => {
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
      this.fornecedorService.updateFornecedor(req).subscribe(
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

  loadData(dados: EmpresaRequest) {
    this.isUpdate = dados.idFornecedor !== ''
    this.fornecedorForm.controls['idFornecedor'].setValue(dados.idFornecedor)
    this.fornecedorForm.controls['nome'].setValue(dados.nome)
    this.fornecedorForm.controls['cnpj'].setValue(dados.cnpj)
    this.fornecedorForm.controls['inscricaoEstadual'].setValue(dados.inscricaoEstadual)
    this.fornecedorForm.controls['fantasia'].setValue(dados.fantasia)
    this.fornecedorForm.controls['responsavel'].setValue(dados.responsavel)
    this.fornecedorForm.controls['contato1'].setValue(dados.contato1)
    this.fornecedorForm.controls['contato2'].setValue(dados.contato2)
    this.fornecedorForm.controls['email'].setValue(dados.email)
    this.fornecedorForm.controls['cep'].setValue(dados.cep)
    this.fornecedorForm.controls['endereco'].setValue(dados.logradouro)
    this.fornecedorForm.controls['numero'].setValue(dados.numero)
    this.fornecedorForm.controls['bairro'].setValue(dados.bairro)
    this.fornecedorForm.controls['cidade'].setValue(dados.cidade)
    this.fornecedorForm.controls['estado'].setValue(dados.estado)
    this.fornecedorForm.controls['complemento'].setValue(dados.complemento)
  }

  buscaCep(e: any) {
    this.loading.show();
    this.baseService.getCep(e.target.value).subscribe(result => {
      if (result != null) {
        this.loading.hide();
        this.fornecedorForm.controls['endereco'].setValue(result.logradouro)
        this.fornecedorForm.controls['bairro'].setValue(result.bairro)
        this.fornecedorForm.controls['cidade'].setValue(result.localidade)
        this.fornecedorForm.controls['estado'].setValue(result.uf)
      }
    }, (error) => {
      this.loading.hide();
      console.info('Error BuscaCep: ', error)
    })
  }
}
