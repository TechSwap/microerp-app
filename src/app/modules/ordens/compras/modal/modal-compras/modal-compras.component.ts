import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Cliente} from "../../../../../models/response/cliente-response.model";
import {Fornecedor} from "../../../../../models/response/fornecedor-response.model";
import {FornecedoresService} from "../../../../../services/fornecedores.service";
import {Metadata} from "../../../../../models/resultlist";
import {SelectModel} from "../../../../../models/SelectModel";
import {DepartamentosService} from "../../../../../services/departamentos.service";
import {NotificationService} from "../../../../../services/notification.service";
import {UnidadeMedida} from "../../../../../models/unidade.model";
import {DetalheOrdemServico} from "../../../../../models/ordemServico.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrls: ['./modal-compras.component.css']
})
export class ModalComprasComponent extends BaseComponent implements OnInit  {
  fornecedor: Fornecedor[] = [];
  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 200
  }
  dropFornecedores: SelectModel[] =  []
  dropDepartamentos: SelectModel[] = []
  conteudo = false;
  detalheOrdemServicos: DetalheOrdemServico[] = [];
  detalhes = new MatTableDataSource<DetalheOrdemServico>()
  displayedColumns: string[] = ['descricao', 'valorUnitario', 'qtd', 'unidade'];

  ocForm: FormGroup = this.formBuilder.group({
    idOrdemCompra: [''],
    idFornecedor: [''],
    solicitante: [''],
    idDepartamento: ['']
  })

  detalhesOC:  FormGroup = this.formBuilder.group({})

  unidades: UnidadeMedida[] = [
    { value: 'PC', viewValue: 'Pecas' },
    { value: 'MT', viewValue: 'Metros' },
    { value: 'LT', viewValue: 'Litros' },
  ];

  ngOnInit(): void {
    this.getListaFornecedores()
    this.getListDepartamentos()
  }
  constructor(
    public dialogRef: MatDialogRef<ModalComprasComponent>,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private notification: NotificationService,
    private fornecedorService: FornecedoresService,
    private departamentoService: DepartamentosService,
  ) {
    super();
  }

  onCloseClick(){
    this.dialogRef.close();
  }

  mostraConteudo() {
    this.conteudo = !this.conteudo;
  }

  getListaFornecedores() {
    this.loading.show();
    this.fornecedorService.listFornecedores(this.metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loading.hide();
          this.dropFornecedores = this.loadDropFornecedor(result.data, this.dropFornecedores)
        }else {
          this.notification.warning('Erro ao Listar');
          this.loading.hide();
        }
      },
      (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    );
  }

  getListDepartamentos(){
    this.loading.show();
    this.departamentoService.getListaDepartamentos(this.metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropDepartamentos = this.loadDropDepartamento(result.data, this.dropDepartamentos)
        } else {
          this.notification.warning('Erro ao Listar');
          this.loading.hide();
        }
      }, (error) => {
        this.notification.warning('Erro ao Listar');
        this.loading.hide();
      }
    )
  }

}
