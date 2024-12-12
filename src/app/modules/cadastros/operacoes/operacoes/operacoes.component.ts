import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../shared/base/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SelectModel} from "../../../../models/SelectModel";
import {Metadata} from "../../../../models/resultlist";
import {DepartamentosService} from "../../../../services/departamentos.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalOperacoesComponent } from '../modal/modal-operacoes/modal-operacoes.component';
import { GridOperacoesComponent } from '../grid/grid-operacoes/grid-operacoes.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.css']
})
export class OperacoesComponent extends BaseComponent implements OnInit {
  formSearchOperacoes: FormGroup = this.formBuilder.group({
    'departamentoId': [''],
    'responsavel': ['']
  })

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  dropDepartamentos: SelectModel[] =  []
  @ViewChild(GridOperacoesComponent) gridOperacoes!: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notification: NotificationService ,
    private loading: NgxSpinnerService,
    private departamentoService: DepartamentosService ,
    private operacoesService: OperacoesService 
  ) {
    super();
  }
    ngOnInit(): void {
      this.getListaDepartamentos()
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

  addOperacao() {    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px'     
    };

    const dialogRef = this.dialog.open(ModalOperacoesComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      console.info('Result afterclosed modal: ', result)
      if(result.success) {
        this.notification.success('Adicionado com sucesso')    
        this.getListaOperacoes(this.metaData)    
      }
    });
  }

  getListaOperacoes(metaData: Metadata) {
    this.loading.show();
    this.operacoesService.listOperacoes(metaData).subscribe(
      (result) => {      
        if(result === null) {
          this.gridOperacoes.loadGridOperacoes([], 0)
        }else {
          if (result.statusCode === 200 || result.statusCode === 204) {
            this.gridOperacoes.loadGridOperacoes(result.data, result.metaData.totalRecords)
          } 
        }
        this.loading.hide();

      }, (error) => {
        console.info('Error: ', error)
        this.loading.hide();
      })
  }

}
