import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../shared/base/base.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GridFuncionarioComponent} from "./grid/grid-funcionario/grid-funcionario.component";
import {Funcionario} from "../../../models/response/funcionario.model";
import {ModalFuncionarioComponent} from "./modal/modal-funcionario/modal-funcionario.component";
import {SelectModel} from "../../../models/SelectModel";
import {Metadata} from "../../../models/resultlist";
import {DepartamentosService} from "../../../services/departamentos.service";
import {FuncionariosService} from "../../../services/funcionarios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent extends BaseComponent implements OnInit {

  dropDepartamentos: SelectModel[] =  []
  searchForm: FormGroup = this.formBuilder.group({
    'departamentoId': [''],
    'nome': [''],
    'funcao': ['']
  })

  @ViewChild('GridFuncionarioComponent')
  gridFuncionarioComponent!: GridFuncionarioComponent;

  constructor(
    public dialog: MatDialog,
    private departamentoService: DepartamentosService,
    private funcionarioService: FuncionariosService,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private notification: NotificationService
  ) {
    super();
  }



  ngOnInit(): void {
    this.getListaDepartamentos()
  }

  AddFuncionario() {
    let data: Funcionario = {
      idFuncionario: '',
      codigo: "",
      funcao: "",
      nome: "",
      valorHora: 0,
      departamentoId: '',
      centroCusto: ''
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };

    const dialogRef = this.dialog.open(ModalFuncionarioComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.notification.success('Adicionado com sucesso')
      }
    });
  }

  SearchFuncionario() {
    let dados = this.searchForm.value;
    this.loading.show();

    this.funcionarioService.searchFuncionarios(dados.departamentoId, dados.nome, dados.funcao).subscribe(
      (result) => {
        if(result !== null) {
          if (result.statusCode === 200) {
            this.gridFuncionarioComponent.loadGridFuncionarios(result.data, result.metaData.totalRecords)
          } else {
            this.loading.hide();
            this.gridFuncionarioComponent.loadGridFuncionarios([], 0)
          }
        } else {
          this.loading.hide();
          this.gridFuncionarioComponent.loadGridFuncionarios([], 0)
        }
        this.loading.hide();
      },
      (error) => {
        this.gridFuncionarioComponent.loadGridFuncionarios([], 0)
        this.loading.hide();
      }
    );
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
