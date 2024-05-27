import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseService} from "../../../../../services/base.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {EmpresaRequest} from "../../../../../models/request/empresa-request.model";

@Component({
  selector: 'app-modal-fornecedor',
  templateUrl: './modal-fornecedor.component.html',
  styleUrls: ['./modal-fornecedor.component.css']
})
export class ModalFornecedorComponent implements OnInit{

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
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadData(this.data.dados)
  }

  loadData(dados: EmpresaRequest) {
    this.fornecedorForm.controls['idFornecedor'].setValue(dados.idCliente)
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

}
