import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmpresaRequest } from 'src/app/models/request/empresa-request.model';
import { BaseService } from 'src/app/services/base.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

  isReadonly: boolean = false
  isUpdate: boolean = false

  clienteForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
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
    public dialogRef: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService: BaseService,
    private clientesService: ClientesService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService

  ) { }

   ngOnInit(): void {
    this.loadData(this.data.dados)

     this.isReadonly = this.data.dados.idCliente !== ''

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.spinner.show();
    let dados = this.clienteForm.value;

    let req: EmpresaRequest = {
      idCliente: dados.idCliente,
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
      isCliente: true,
      complemento: dados.complemento
    }

    if(req.idCliente === '') {
      this.clientesService.postcliente(req).subscribe((result) => {
        console.info('Result: ', result)
        if (result.statusCode === 201) {
          this.spinner.hide();
          this.dialogRef.close();
        } else {
          this.toastrService.error('Error', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
        }
      }, (error) => {
        console.info('Error: ', error)

        if (error.status === 400 || error.status === 404) {
          let msg = error.error.errors[0].userMessage
          this.toastrService.warning('Atenção!', msg, {
            timeOut: 3000,
          });
        }

        this.spinner.hide();
      })
    }else{
      this.clientesService.putCliente(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.spinner.hide();
            this.dialogRef.close();
          }
        },
        (error) => {
          console.info('Error Update Cliente: ', error)
          this.spinner.hide();
        }
      )

    }
  }

  buscaCep(e: any) {
    this.spinner.show();
    this.baseService.getCep(e.target.value).subscribe(result => {
      if (result != null) {
        this.spinner.hide();

        this.clienteForm.controls['endereco'].setValue(result.logradouro)
        this.clienteForm.controls['bairro'].setValue(result.bairro)
        this.clienteForm.controls['cidade'].setValue(result.localidade)
        this.clienteForm.controls['estado'].setValue(result.uf)
      }
    }, (error) => {
      this.spinner.hide();
      console.info('Error BuscaCep: ', error)
      this.toastrService.success('CEP Error!', 'Title Success!');
    })
  }

  loadData(dados: EmpresaRequest) {

    this.isUpdate = dados.idCliente !== ''

    this.clienteForm.controls['idCliente'].setValue(dados.idCliente)
    this.clienteForm.controls['nome'].setValue(dados.nome)
    this.clienteForm.controls['cnpj'].setValue(dados.cnpj)
    this.clienteForm.controls['inscricaoEstadual'].setValue(dados.inscricaoEstadual)
    this.clienteForm.controls['fantasia'].setValue(dados.fantasia)
    this.clienteForm.controls['responsavel'].setValue(dados.responsavel)
    this.clienteForm.controls['contato1'].setValue(dados.contato1)
    this.clienteForm.controls['contato2'].setValue(dados.contato2)
    this.clienteForm.controls['email'].setValue(dados.email)
    this.clienteForm.controls['cep'].setValue(dados.cep)
    this.clienteForm.controls['endereco'].setValue(dados.logradouro)
    this.clienteForm.controls['numero'].setValue(dados.numero)
    this.clienteForm.controls['bairro'].setValue(dados.bairro)
    this.clienteForm.controls['cidade'].setValue(dados.cidade)
    this.clienteForm.controls['estado'].setValue(dados.estado)
    this.clienteForm.controls['complemento'].setValue(dados.complemento)
  }

}
