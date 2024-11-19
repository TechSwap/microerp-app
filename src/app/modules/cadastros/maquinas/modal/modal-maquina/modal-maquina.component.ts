import {Component, Inject, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {SelectModel} from "../../../../../models/SelectModel";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {DepartamentosService} from "../../../../../services/departamentos.service";
import {NotificationService} from "../../../../../services/notification.service";
import {Metadata} from "../../../../../models/resultlist";
import {Maquina} from "../../../../../models/response/maquina.model";
import {MaquinasService} from "../../../../../services/maquinas.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-modal-maquina',
  templateUrl: './modal-maquina.component.html',
  styleUrls: ['./modal-maquina.component.css']
})
export class ModalMaquinaComponent extends BaseComponent implements OnInit {
  isUpdate: boolean = false
  dropDepartamentos: SelectModel[] =  []
  dropStatus: SelectModel[] =  []
  vendidaChecked = false

  maquinaForm: FormGroup = this.formBuilder.group({
    'idMaquina': [''],
    'nome': [''],
    'numeroSerie': [''],
    'departamentoId': [''],
    'fabricante': [''],
    'ativoFixo': [''],
    'status': ['']
  })

  constructor(
    public dialogRef: MatDialogRef<ModalMaquinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private departamentoService: DepartamentosService,
    private maquinaService: MaquinasService,
    private notification: NotificationService
  ) {
    super();
  }
  ngOnInit(): void {
    this.getListaDepartamentos()
    this.loadMaquina(this.data.dados)
    this.loadDropStatus()
  }

  onSubmit() {
    this.loading.show();
    let dados = this.maquinaForm.value;

    let req: Maquina = {
      idMaquina: dados.idMaquina,
      nome: dados.nome,
      fabricante: dados.fabricante,
      idDepartamento: dados.departamentoId,
      status: dados.status,
      numeroSerie: dados.numeroSerie,
      ativoFixo: dados.ativoFixo,
      vendida: this.vendidaChecked
    }

    if (dados.idMaquina === '') {
      this.maquinaService.postMaquina(req).subscribe((result) => {
        if (result.statusCode === 204) {
          this.dialogRef.close({
            success: true
          });
        }
        this.loading.hide();
      }, (error) => {
        if (error.status === 400 || error.status === 404) {
          let msg = error.statusText
          this.notification.warning(msg)
        }
        this.loading.hide();
      })
    }else {
      this.maquinaService.putMaquina(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.dialogRef.close({
              success: true
            });
            this.loading.hide();

          }
        },
        (error) => {
          console.info('Error: ', error)
          this.loading.hide();
          this.notification.warning('Erro ao atualizar');
        }
      )
    }
  }

  checkVendida(event: MatSlideToggleChange) {
    console.log(`Checked value: ${event.source.checked}`);
    this.vendidaChecked = event.source.checked;
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  getListaDepartamentos() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };
    this.loading.show();

    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropDepartamentos = this.loadDropDepartamentos(result.data, this.dropDepartamentos)
          this.loading.hide();
        } else {
        }
      },
      (error) => {
        this.loading.hide();
      }
    );
  }

  loadDropStatus() {
    let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
    this.dropStatus.push(firstPosition)
    let statusAtivo: SelectModel = {Id: 1, Descricao: "Ativo"}
    this.dropStatus.push(statusAtivo)
    let statusInativo: SelectModel = {Id:0, Descricao: "Inativo"}
    this.dropStatus.push(statusInativo)
  }

  loadMaquina(dados: Maquina) {
    console.info('Dados: ', dados)
    this.isUpdate = dados.idMaquina !== ''
    this.maquinaForm.controls['idMaquina'].setValue(dados.idMaquina)
    this.maquinaForm.controls['numeroSerie'].setValue(dados.numeroSerie)
    this.maquinaForm.controls['departamentoId'].setValue(dados.idDepartamento)
    this.maquinaForm.controls['nome'].setValue(dados.nome)
    this.maquinaForm.controls['fabricante'].setValue(dados.fabricante)
    this.maquinaForm.controls['ativoFixo'].setValue(dados.ativoFixo)
    this.maquinaForm.controls['status'].setValue(dados.status)
    this.vendidaChecked = dados.vendida
  }

}
