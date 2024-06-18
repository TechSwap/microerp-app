import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaRequest} from "../../../models/request/empresa-request.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalClienteComponent} from "../clientes/modal/modal-cliente/modal-cliente.component";
import {Departamento} from "../../../models/response/departamento-response.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalDepartamentosComponent} from "./modal/modal-departamentos/modal-departamentos.component";
import {ModalResult} from "../../../models/modal-result.model";
import {NotificationService} from "../../../services/notification.service";
import {Metadata} from "../../../models/resultlist";
import {NgxSpinnerService} from "ngx-spinner";
import {DepartamentosService} from "../../../services/departamentos.service";
import {GridFornecedorComponent} from "../fornecedores/grid/grid-fornecedor/grid-fornecedor.component";
import {BaseComponent} from "../../shared/base/base.component";
import {GridDepartamentosComponent} from "./grid/grid-departamentos/grid-departamentos.component";
import {SelectModel} from "../../../models/SelectModel";

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent extends BaseComponent implements OnInit{

  dropDepartamentos: SelectModel[] = []

  searchDepartamento: FormGroup = this.formBuilder.group({
    'idDepartamento': [''],
  })

  @ViewChild('GridDepartamentosComponent')
  gridDepartamentosComponent!: GridDepartamentosComponent;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private departamentoService: DepartamentosService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listDepartamentos(this.metaData)
  }

  openModalDepartamento() {
    let data: Departamento = {
      idDepartamento: '',
      descricao: '',
      responsavel: '',
      centroCusto: '',
      status: true
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px',
      dados: data
    };

    const dialogRef = this.dialog.open(ModalDepartamentosComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((result: ModalResult) => {
      if(result.success) {
        this.notification.success('Cliente atualizado com sucesso.')
        this.listDepartamentos(this.metaData)
      }
    });
  }

  listDepartamentos(metaData: Metadata) {
    this.loading.show();
    this.departamentoService.getListaDepartamentos(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          //this.gridDepartamentosComponent.loadGridDepartamento(result.data, result.metaData.totalRecords)
          this.dropDepartamentos = this.loadDropDepartamento(result.data, this.dropDepartamentos)
        } else {
          this.notification.warning('Erro ao Listar');
        }
        this.loading.hide();
      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      })

  }

}
