import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmpresaRequest } from 'src/app/models/request/empresa-request.model';
import { BaseService } from 'src/app/services/base.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { validStr } from 'src/app/utils/string-helpers.utils';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

  clienteForm: FormGroup = this.formBuilder.group({
    'nome': ['', Validators.required],
    'cnpj': ['', Validators.required],
    'inscricaoEstadual': [''],
    'contato1': [''],
    'contato2': [''],
    'email': [''],
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
     private baseService: BaseService,
    private clientesService: ClientesService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService

  ) { }

   ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
     this.spinner.show();
    let dados = this.clienteForm.value;
    let req: EmpresaRequest = {
      nome: dados.nome,
      cnpj: dados.cnpj,
      inscricaoEstadual: dados.inscricaoEstadual,
      contato1: dados.contato1,
      contato2: dados.contato2,
      email: dados.email,
      cep: dados.cep,
      endereco: dados.endereco,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      isCliente: true
    }

    this.clientesService.postcliente(req).subscribe((result) => {
      if (result.statusCode === 200) {
        this.spinner.hide();
        this.dialogRef.close();
      }
    }, (error) => {
       this.spinner.hide();
    })
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

}
