import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import { Funcionario } from 'src/app/models/response/funcionario.model';
import {EmpresaRequest} from "../../../../../models/request/empresa-request.model";
import {FuncionariosService} from "../../../../../services/funcionarios.service";
import {SelectModel} from "../../../../../models/SelectModel";
import {Metadata} from "../../../../../models/resultlist";
import {DepartamentosService} from "../../../../../services/departamentos.service";

@Component({
  selector: 'app-modal-funcionario',
  templateUrl: './modal-funcionario.component.html',
  styleUrls: ['./modal-funcionario.component.css']
})
export class ModalFuncionarioComponent extends BaseComponent implements OnInit{
  isUpdate: boolean = false
  dropDepartamentos: SelectModel[] =  []

  funcionarioForm: FormGroup = this.formBuilder.group({
    'idFuncionario': [''],
    'nome': ['', Validators.required],
    'codigo': [''],
    'departamentoId': [''],
    'centroCusto': [''],
    'funcao': [''],
    'valorHora': ['', Validators.required]
  })

  constructor(
    public dialogRef: MatDialogRef<ModalFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private funcionarioService: FuncionariosService,
    private departamentoService: DepartamentosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadDataFuncionario(this.data.dados)
    this.getListaDepartamentos()

    if(this.data.dados.idFuncionario === '') {
      this.  getCodigoFuncionario()
    }

  }

  getCodigoFuncionario() {
    this.loading.show();
    this.funcionarioService.getCodigoFuncionario().subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.funcionarioForm.controls['codigo'].setValue(result.data.codigo)
        }
        this.loading.hide();
      },
      (error) => {
        console.info('Error Codigo Funcionario: ', error)
        this.loading.hide();
      }
    )

  }

  loadDataFuncionario(dados: Funcionario) {
    this.isUpdate = dados.idFuncionario !== ''
    this.funcionarioForm.controls['idFuncionario'].setValue(dados.idFuncionario)
    this.funcionarioForm.controls['nome'].setValue(dados.nome)
    this.funcionarioForm.controls['codigo'].setValue(dados.codigo)
    this.funcionarioForm.controls['departamentoId'].setValue(dados.departamentoId)
    this.funcionarioForm.controls['centroCusto'].setValue(dados.centroCusto)
    this.funcionarioForm.controls['funcao'].setValue(dados.funcao)
    this.funcionarioForm.controls['valorHora'].setValue(dados.valorHora)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.loading.show();
    let dados = this.funcionarioForm.value;

    let req: Funcionario = {
      idFuncionario: dados.idFuncionario,
      nome: dados.nome,
      codigo: dados.codigo,
      departamentoId: dados.departamentoId,
      centroCusto: dados.centroCustocentroCusto,
      funcao: dados.funcao,
      valorHora: dados.valorHora
    }

    if(req.idFuncionario === '') {
      this.funcionarioService.postFuncionario(req).subscribe((result) => {
        console.info('Result: ', result)
        if (result.statusCode === 201) {
          this.dialogRef.close();
        }
        this.loading.hide();
      }, (error) => {
        console.info('Error: ', error)
        if (error.status === 400 || error.status === 404) {
          let msg = error.error.errors[0].userMessage

        }
        this.loading.hide();
      })
    }else{
      this.funcionarioService.putFuncionario(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.loading.hide();
            this.dialogRef.close();
          }
        },
        (error) => {
          console.info('Error Update Funcionario: ', error)
          this.loading.hide();
        }
      )
    }
  }

  getListaDepartamentos() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };

    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropDepartamentos = this.loadDropDepartamentos(result.data, this.dropDepartamentos)
        } else {

        }
      },
      (error) => {

      }
    );
  }



}
