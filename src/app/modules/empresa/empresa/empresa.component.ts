import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../../services/notification.service";
import { EmpresaService } from 'src/app/services/empresa.service';
import { EmpresaResponse } from 'src/app/models/response/empresa-response.model';
import { EmpresaRequest } from 'src/app/models/request/empresa-request.model';
import { getBase64 } from 'src/app/utils/input-helpers.utils';
import {BaseService} from "../../../services/base.service";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends BaseComponent implements OnInit  {

  empresa: EmpresaResponse = {
    empresaId: '',
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    contato1: '',
    email: '',
    responsavel: '',
    dataFundacao: undefined,
    tipoEmpresa: '',
    logo: '',
    dataCadastro: undefined,
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: ''
  }
  logo: string | ArrayBuffer | null = ''
  selectedFile: any = null;
  isLoadLogo: boolean = false
  imgSrc = ''

  empresaForm: FormGroup = this.formBuilder.group({
    'empresaId': [''],
    'razaoSocial': [''],
    'nomeFantasia': [''],
    'cnpj': [''],
    'inscricaoEstadual': [''],
    'dataFundacao': [''],
    'tipoEmpresa': [''],
    'cep': [''],
    'responsavel': [''],
    'logradouro': [''],
    'numero': [''],
    'bairro': [''],
    'cidade': [''],
    'estado': [''],
    'email': [''],
    'contato1': [''],
    'complemento': [''],
    'logo': [''],
  })

  constructor(
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private loading: NgxSpinnerService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
      this.getEmpresa()
  }

  getEmpresa() {
    // @ts-ignore
    this.loading.show();
    this.empresaService.getEmpresa().subscribe((result) => {
      if(result !== null) {
        if (result.statusCode === 200 ) {
          this.loadData(result.data)
        }
      } else {
        this.loading.hide();
      }
      this.loading.hide();
    })
  }

  updateEmpresa() {
    this.loading.show();
    let dados = this.empresaForm.value;

    let req: EmpresaRequest = {
      empresaId: dados.empresaId,
      nome: dados.razaoSocial,
      fantasia: dados.nomeFantasia,
      cnpj: dados.cnpj,
      inscricaoEstadual: dados.inscricaoEstadual,
      responsavel: dados.responsavel,
      contato1: dados.contato1,
      email: dados.email,
      logo: this.logo,
      cep: dados.cep,
      dataFundacao: dados.dataFundacao,
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      tipoEmpresa: dados.tipoEmpresa,
      complemento: dados.complemento
    }

    this.empresaService.putEmpresa(req).subscribe((result) => {
      if (result.statusCode === 204) {
        this.loading.hide();
        this.notification.success(result.msg);
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
  }

  async onSelect(event:any) {
    this.selectedFile = event.target.files[0] ?? null;
    this.logo = await getBase64(event.target.files[0])
  }

  buscaCep(e: any) {
    this.loading.show();
    this.baseService.getCep(e.target.value).subscribe(result => {
      console.info('Result: ', result)
      if (result != null) {
        this.loading.hide();
        this.empresaForm.controls['logradouro'].setValue(result.logradouro)
        this.empresaForm.controls['bairro'].setValue(result.bairro)
        this.empresaForm.controls['cidade'].setValue(result.localidade)
        this.empresaForm.controls['estado'].setValue(result.uf)
      }
    }, (error) => {
      this.loading.hide();
      this.notification.warning('Erro ao buscar o CEP!');
    })
  }

  loadData(data: EmpresaResponse) {
    this.isLoadLogo = data.logo !== null
    this.imgSrc = data.logo

    this.empresaForm = this.formBuilder.group({
      'empresaId':data.empresaId,
      'razaoSocial': data.razaoSocial,
      'nomeFantasia': data.nomeFantasia,
      'cnpj': data.cnpj,
      'inscricaoEstadual': data.inscricaoEstadual,
      'dataFundacao': data.dataFundacao,
      'tipoEmpresa': data.tipoEmpresa,
      'cep': data.cep,
      'responsavel': data.responsavel,
      'logradouro': data.logradouro,
      'numero': data.numero,
      'bairro': data.bairro,
      'cidade': data.cidade,
      'estado': data.estado,
      'email': data.email,
      'contato1': data.contato1,
      'complemento': data.complemento,
      'logo': data.logo,
      }
    )
  }
}
