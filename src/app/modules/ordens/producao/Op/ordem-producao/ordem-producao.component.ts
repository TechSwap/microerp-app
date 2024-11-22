import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {SelectModel} from "../../../../../models/SelectModel";
import {ClientesService} from "../../../../../services/clientes.service";
import {Metadata} from "../../../../../models/resultlist";
import {OrdemServicosService} from "../../../../../services/ordem-servicos.service";
import {OrdemServicoResponse} from "../../../../../models/response/ordem-servico-response.model";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {DetalheOrdemServico} from "../../../../../models/ordemServico.model";
import {DetalheOrdemProducao} from "../../../../../models/ordemProducao.model";
import {numericOnly} from "../../../../../utils/input-helpers.utils";

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css']
})
export class OrdemProducaoComponent extends BaseComponent implements OnInit {
  novaOp: FormGroup = this.formBuilder.group({
    'idOrdemServico': [''],
    'idCliente': ['']
  })
  detalhesOP: FormGroup = this.formBuilder.group({
    'idDetalhesOrdemProducao': [''],
    'idOrdemProducao': [''],
    'descricao': [''],
    'qtd': [''],
    'unidade': ['']
  })

  displayedColumns: string[] = ['descricao', 'qtd', 'unidade'];

  detalhesOrdemProducao = new MatTableDataSource<DetalheOrdemProducao>()
  detalheOp: DetalheOrdemProducao[] = []
  dropClientes: SelectModel[] = []
  dropOrdemServicos: SelectModel[] = []
  unidades: SelectModel[] = []
  conteudo = false
  isUpdate = false

  constructor(
    private clienteService: ClientesService,
    private ordemServicosService: OrdemServicosService,
    private loading: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    super();
  }
  ngOnInit(): void {
    this.getListOs()
    this.getListaClientes()
    this.getUnidades()
  }

  getListaClientes() {
    this.loading.show();
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 400,
    };
    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.dropClientes = this.loadDropClientes(result.data, this.dropClientes)
          this.loading.hide();
        }
      },
      (error) => {
        this.loading.hide();
      }
    );
  }

  getListOs() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 400,
    };
    this.loading.show();
    this.ordemServicosService.listaOs(metaData).subscribe(
      (result) => {
      if (result.statusCode === 200) {
        let firstPosition: SelectModel = { Id: "", Descricao: "Selecione" }
        this.dropOrdemServicos.push(firstPosition)
        let os : OrdemServicoResponse[] = result.data;
        os.forEach(o => {
          this.dropOrdemServicos.push({
            Id: o.idOrdemServico,
            Descricao: o.numeroOS
          })
        })
        this.loading.hide();
      }
      },
      (error) => {
        this.loading.hide();
      }
    )
  }

  getUnidades() {
    this.unidades = this.loadDropUnidades(this.unidades)
  }

  loadNumeroOs(event: MatSelectChange) {
    var idOrdemServico = event.value;
    if(idOrdemServico != '') {
      this.ordemServicosService.getOneOs(idOrdemServico).subscribe(
        (result) => {
          if (result.statusCode === 200) {
            let os = result.data
            this.novaOp.controls['idCliente'].setValue(os.idCliente)
          }
          this.loading.hide();
        },
        (error) => {

          this.loading.hide();
        }
      );
    }else {
      this.novaOp.controls['idCliente'].setValue('')
    }
  }

  mostraConteudo() {
    this.conteudo = !this.conteudo;
  }

  adicionaDetalhe() {
    let det = this.detalhesOP.value

    let idx = this.detalheOp.length

    let dado: DetalheOrdemProducao = {
      index: idx === 0 ? 0 : idx + 1,
      descricao: det.descricao,
      idDetalhesOrdemProducao: det.idDetalhesOrdemProducao,
      idOrdemProducao: det.idOrdemProducao,
      quantidade: det.qtd,
      unidade: det.unidade
    }
    this.detalheOp.push(dado)
    this.detalhesOrdemProducao.data = [...this.detalheOp]
  }

  loadFormDetalhes(item: DetalheOrdemProducao) {
    this.detalhesOP.controls['idDetalhesOrdemProducao'].setValue(item.idDetalhesOrdemProducao)
    this.detalhesOP.controls['idOrdemProducao'].setValue(item.idOrdemProducao)
    this.detalhesOP.controls['descricao'].setValue(item.descricao)
    this.detalhesOP.controls['qtd'].setValue(item.quantidade)
    this.detalhesOP.controls['unidade'].setValue(item.unidade)
  }

  getItemLista(detalhe: DetalheOrdemProducao) {
    this.loadFormDetalhes(detalhe)
  }

  onSubmit() {}

  protected readonly numericOnly = numericOnly;
}
