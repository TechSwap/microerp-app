import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import { SelectModel } from 'src/app/models/SelectModel';
import { Metadata } from 'src/app/models/resultlist';
import { Departamento } from 'src/app/models/response/departamento-response.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { OperacaoRequestModel } from 'src/app/models/request/operacao-request.model';

@Component({
  selector: 'app-modal-operacoes',
  templateUrl: './modal-operacoes.component.html',
  styleUrls: ['./modal-operacoes.component.css']
})
export class ModalOperacoesComponent extends BaseComponent implements OnInit {
  dropDepartamentos: SelectModel[] =  []
  isUpdate: boolean = false
  deparamentos: Departamento[] = []
  
  operacoesForm: FormGroup = this.formBuilder.group({
    'idOperacao': [''],
    'departamentoId': [''],
    'descricao': [''],
    'status': [''],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalOperacoesComponent>,   
    private formBuilder: FormBuilder,    
    private departamentoService: DepartamentosService,
    private loading: NgxSpinnerService,
    private operacoesService: OperacoesService
  ) {
    super();
  }
 
 
  ngOnInit(): void {
    this.getListaDepartamentos()
  }


  onCloseClick() {
    this.dialogRef.close({success: false});
  } 

  onSubmit() {
    var request: OperacaoRequestModel = {
      idDepartamento: this.operacoesForm.value.departamentoId,
      descricao: this.operacoesForm.value.descricao
    }
    this.operacoesService.addOperacao(request).subscribe(
      (result) => {    
        if(result.statusCode === 204){
          this.dialogRef.close({
            success: true
          });
        }
      }, 
      (error) => {
        console.info('Error: ', error)
      }
    )
  }

  getListaDepartamentos() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };
    this.loading.show()

    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) { 
          this.deparamentos = result.data
          this.dropDepartamentos = this.loadDropDepartamentos(result.data, this.dropDepartamentos)
          this.loading.hide()
        }
               
      },
      (error) => {
        this.loading.hide()
      }
    );
  }

}
