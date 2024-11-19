import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseComponent} from "../../shared/base/base.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DepartamentosService} from "../../../services/departamentos.service";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../../services/notification.service";
import {SelectModel} from "../../../models/SelectModel";
import {Metadata} from "../../../models/resultlist";
import {Maquina} from "../../../models/response/maquina.model";
import {ModalFuncionarioComponent} from "../funcionarios/modal/modal-funcionario/modal-funcionario.component";
import {ModalMaquinaComponent} from "./modal/modal-maquina/modal-maquina.component";
import {GridFuncionarioComponent} from "../funcionarios/grid/grid-funcionario/grid-funcionario.component";
import {GridMaquinaComponent} from "./grid/grid-maquina/grid-maquina.component";

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent extends BaseComponent implements OnInit {
  dropDepartamentos: SelectModel[] =  []
  dropStatus: SelectModel[] =  []
  searchForm: FormGroup = this.formBuilder.group({
    'numeroSerie': [''],
    'fabricante': [''],
    'departamentoId': [''],
  })

  @ViewChild('GridMaquinaComponent')
  GridMaquinasComponent!: GridMaquinaComponent;

  constructor(
    public dialog: MatDialog,
    private departamentoService: DepartamentosService,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaDepartamentos()
  }

  addMaquina() {
    let data: Maquina = {
      ativoFixo: ""
      , fabricante: ""
      , idDepartamento: ""
      , idMaquina: ""
      , nome: ""
      , numeroSerie: ""
      , status: 0
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };

    const dialogRef = this.dialog.open(ModalMaquinaComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.notification.success('Adicionado com sucesso')
      }
    });
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
