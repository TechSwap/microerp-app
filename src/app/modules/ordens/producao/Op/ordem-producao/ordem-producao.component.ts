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
import {OrdemProducaoRequestModel} from "../../../../../models/request/ordem-producao-request.model";
import {OrdemProducaoService} from "../../../../../services/ordem-producao.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css']
})
export class OrdemProducaoComponent extends BaseComponent implements OnInit {
  novaOp: FormGroup = this.formBuilder.group({
    'idOrdemServico': [''],
    'idCliente': [''],
    'prazo': ['']
  })
  detalhesOP: FormGroup = this.formBuilder.group({
    'idx': [''],
    'idDetalhesOrdemProducao': [''],
    'idOrdemProducao': [''],
    'descricao': [''],
    'qtd': [''],
    'unidade': ['']
  })
  displayedColumns: string[] = ['descricao', 'qtd', 'unidade'];
  numeroOP: number = 0;
  detalhesOrdemProducao = new MatTableDataSource<DetalheOrdemProducao>()
  detalheOp: DetalheOrdemProducao[] = []
  dropClientes: SelectModel[] = []
  dropOrdemServicos: SelectModel[] = []
  unidades: SelectModel[] = []
  conteudo = false
  isUpdate = false
  removed = false
  idOrdemProducao = ''
  idxRemove: DetalheOrdemProducao  = {descricao: "", idDetalhesOrdemProducao: "", idOrdemProducao: "", index: 0, prazoEntrega: undefined, quantidade: 0, unidade: ""}

  constructor(
    private clienteService: ClientesService,
    private ordemServicosService: OrdemServicosService,
    private ordemProducaoService: OrdemProducaoService,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.verifyOp()
    this.getListOs()
  }

  verifyOp() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idOrdemProducao = <string>params.get('id')     
      if(this.idOrdemProducao !== null) {
        this.getOrdemProducao(this.idOrdemProducao)
        this.isUpdate = true
      }
    })
  }

  getOrdemProducao(idOrdemProducao: string) {
    this.loading.show()
    this.ordemProducaoService.getOneOP(idOrdemProducao).subscribe((result) => {
      if (result.statusCode === 200) {
        this.numeroOP = result.data.numeroOp
        let op = result.data
        this.novaOp.controls['idOrdemServico'].setValue(op.idOrdemServico)
        this.novaOp.controls['idOrdemServico'].disable()
        this.novaOp.controls['idCliente'].setValue(op.idCliente)
        this.novaOp.controls['idCliente'].disable()
        this.novaOp.controls['prazo'].setValue(op.prazo)
        let detalhes = op.detalhes

        let idx = 0;
        detalhes.forEach((d: DetalheOrdemProducao) => {
          let deta: DetalheOrdemProducao = {
            idDetalhesOrdemProducao: d.idDetalhesOrdemProducao,
            idOrdemProducao: d.idOrdemProducao,
            index: idx === 0 ? 1 : idx + 1,
            descricao: d.descricao,
            quantidade: d.quantidade,
            unidade: d.unidade
          }
          idx++
          this.detalheOp.push(deta)
          this.detalhesOrdemProducao.data = [...this.detalheOp]
        });
        this.mostraConteudo()
      }
      this.loading.hide()
    },
      (error) => {
        this.loading.hide();
      }
    )
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
        }
        this.getUnidades()
        this.loading.hide();
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
        os.filter((ordem) => ordem.status === 0).forEach(o => {
          this.dropOrdemServicos.push({
            Id: o.idOrdemServico,
            Descricao: o.numeroOS
          })
        })
        this.getListaClientes()
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
            this.novaOp.controls['prazo'].setValue(os.prazo)
            let detalhes = os.detalheOrdemServicos

            let idx = 0;
            detalhes.forEach((d: DetalheOrdemServico) => {
              let deta: DetalheOrdemProducao = {
                idOrdemProducao: "",
                index: idx === 0 ? 1 : idx + 1,
                descricao: d.descricao,
                quantidade: d.quantidade,
                unidade: d.unidade
              }
              idx++
              this.detalheOp.push(deta)
              this.detalhesOrdemProducao.data = [...this.detalheOp]
            });
            this.mostraConteudo()
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
    let idx = this.detalheOp.length > 0 ? 0 : this.detalheOp.length
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

  resetFormDetalhes() {
    this.detalhesOP.controls['idDetalhesOrdemProducao'].setValue('')
    this.detalhesOP.controls['idOrdemProducao'].setValue('')
    this.detalhesOP.controls['descricao'].setValue('')
    this.detalhesOP.controls['qtd'].setValue('')
    this.detalhesOP.controls['unidade'].setValue('')
  }

  getItemLista(detalhe: DetalheOrdemProducao) {
    this.loadFormDetalhes(detalhe)
    this.removed = !this.removed
    this.idxRemove = detalhe;
  }

  removeIten() {
    let idx = this.idxRemove
    let exitsIdx = this.detalheOp.findIndex((d) => d === idx)
    if(exitsIdx !== -1) {
      if (idx != null) {
        this.detalheOp.splice(exitsIdx, 1)
      }
      this.detalhesOrdemProducao.data = [...this.detalheOp]
      this.removed = false
      this.resetFormDetalhes()
    }
  }

  onSubmit() {
    this.loading.show();
    let baseForm = this.novaOp.value
    var req: OrdemProducaoRequestModel = {
      idOrdemServico: baseForm.idOrdemServico,
      idCliente: baseForm.idCliente,
      prazo: baseForm.prazo,
      detalhes: this.detalheOp
    }
    this.ordemProducaoService.addNovaOp(req).subscribe(
      (result) => {
        console.info('Response Add Ordem: ', result)
        if (result.statusCode === 204) {
          this.loading.hide();
          this.router.navigate(['/ordemProducao'])
        }
      },
      (error) => {
        this.loading.hide();
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
      }
    )

  }

  protected readonly numericOnly = numericOnly;
}
