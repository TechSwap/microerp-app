import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DetalheOrdemServico } from 'src/app/models/ordemServico.model';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { SelectModel } from 'src/app/models/SelectModel';
import { UnidadeMedida } from 'src/app/models/unidade.model';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import { ClientesService } from 'src/app/services/clientes.service';
import { OrdemServicosService } from 'src/app/services/ordem-servicos.service';
import { ModalServicoComponent } from '../../modal/modal-servico/modal-servico.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { dataPrevEntrega, numericOnly } from 'src/app/utils/input-helpers.utils';
import { Router, ActivatedRoute } from '@angular/router';
import { Metadata } from 'src/app/models/resultlist';
import { OrdemServicosRequestModel } from 'src/app/models/request/ordem-servico.request.model';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent  extends BaseComponent implements OnInit {
  osNumber: number = 0;
  resultAddItem = {}
  conteudo = false;
  clientes: Cliente[] = [];
  detalheOrdemServicos: DetalheOrdemServico[] = [];
  detalhes = new MatTableDataSource<DetalheOrdemServico>()

  isUpdate = false

  unidades: UnidadeMedida[] = [
    { value: 'PC', viewValue: 'Pecas' },
    { value: 'MT', viewValue: 'Metros' },
    { value: 'LT', viewValue: 'Litros' },
  ];
  os: any
  dropClientes: SelectModel[] =  []

  detalhesOS:  FormGroup = this.formBuilder.group({
    'idDetalhesOrdemServico': [''],
    'ordemServicoId': [''],
    'descricao': [''],
    'valorUnitario': [''],
    'qtd': [''],
    'unidade': ['']
  })
  ordemServicoId = ''

 
  osForm: FormGroup = this.formBuilder.group({
    'idOrdemServico': [''],
    'idCliente': [''],
    'solicitante': [''],
    'notaEntrada': [''],
    'pedido': [''],
    'orcamento': [''],
    'prazo': ['', [Validators.max(9999), Validators.min(0)]],
    'valorTotal': [''],
    'lancamento': [''],
    'dataPrevEntrega': [''],
    'dataEntrega': [''],
    'notaSaida': ['']
  })
  removed = false

  displayedColumns: string[] = ['descricao', 'valorUnitario', 'qtd', 'unidade'];
  idxRemove: any;

  constructor(   
    private clienteService: ClientesService,
    private ordemServicosService: OrdemServicosService,
    private router: Router,   
    private activatedRoute : ActivatedRoute,    
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy
  }

  
  ngOnInit(): void {
    this.verifyOs()
  }

  verifyOs() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.ordemServicoId = <string>params.get('id')      
      if(this.ordemServicoId !== null) {       
        this.isUpdate = true
        this.getOrdem(this.ordemServicoId)
      }else {
        this.getLastOs()        
      }
    })
    this.getListaClientes()
  }

  getOrdem(idOrdemServico: string) {
    this.ordemServicosService.getOneOs(idOrdemServico).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.os = result.data          
          this.osNumber = result.data.numeroOS
          this.loadData(this.os)          
        } else {
          this.toastrService.warning('Erro ao Carregar Ordem Servico', 'Atenção!');
        }
        this.loading.hide();
      },
      (error) => {
        this.toastrService.warning('Erro ao Carregar Ordem Servico', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  getListaClientes() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };
    this.loading.show();
    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.clientes = result.data;
          this.dropClientes = this.loadDropClientes(result.data, this.dropClientes)
          this.loading.hide();
        } else {
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  
  mostraConteudo() {
    this.conteudo = !this.conteudo;
  }
  
  getLastOs() {
    this.loading.show();
    this.ordemServicosService.getNovaOS().subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.osNumber = result.data.ordemServico;
        } else {
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
        this.loading.hide();
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
        this.loading.hide();
      }
    );
  }

  setPrevisaoEntrega(type: string, event:  MatDatepickerInputEvent<Date>) {
    let dataLancamento = moment(event.value).format('YYYY-MM-DD')
    let prazo = this.osForm.controls['prazo'].value
    if(prazo === ''||  prazo === undefined) {
      alert('Digite um prazo')
    }else {
      let result = dataPrevEntrega(<Date>event.value, prazo)
      let dataPrev = moment(result).toDate()

      this.osForm.controls['dataPrevEntrega'].setValue(dataPrev)
    }
  }

  loadData(dados: any) {
    let dataPrevEntrega = dados.dataPrevisaoEntrega === '' ? '' : moment(dados.dataPrevisaoEntrega).toDate()
    let dataEntrega = dados.dataEntrega === '' || dados.dataEntrega == "0001-01-01T00:00:00" ? '' : moment(dados.dataEntrega).toDate()
    this.detalheOrdemServicos = dados.detalheOrdemServicos;

    this.osForm.controls['idOrdemServico'].setValue(dados.idOrdemServico)
    this.osForm.controls['idCliente'].setValue(dados.idCliente)
    this.osForm.controls['idCliente'].disable()
    this.osForm.controls['solicitante'].setValue(dados.solicitante)
    this.osForm.controls['notaEntrada'].setValue(dados.notaEntrada)
    this.osForm.controls['pedido'].setValue(dados.pedido)
    this.osForm.controls['orcamento'].setValue(dados.orcamento)
    this.osForm.controls['prazo'].setValue(dados.prazo)
    this.osForm.controls['valorTotal'].setValue(dados.valorTotal)
    this.osForm.controls['lancamento'].setValue(dados.lancamento)
    this.osForm.controls['dataPrevEntrega'].setValue(dataPrevEntrega)
    this.osForm.controls['dataEntrega'].setValue(dataEntrega)
    this.osForm.controls['notaSaida'].setValue(dados.notaSaida)
    this.mostraConteudo()
    this.detalhes.data.push(...this.detalheOrdemServicos);
  }


  addListaDetalhes() {
    let det = this.detalhesOS.value
    let idx = this.detalheOrdemServicos.length > 0 ? 0 : this.detalheOrdemServicos.length
    let details: DetalheOrdemServico = {
      idDetalhesOrdemServico: this.detalhesOS.controls['idDetalhesOrdemServico'].value,
      ordemServicoId:  this.detalhesOS.controls['ordemServicoId'].value,
      descricao: this.detalhesOS.controls['descricao'].value,
      valorUnitario: parseFloat(this.detalhesOS.controls['valorUnitario'].value),
      quantidade: Number(this.detalhesOS.controls['qtd'].value),
      unidade: this.detalhesOS.controls['unidade'].value,
    };

    this.detalheOrdemServicos.push(details)
    this.detalhes.data = [...this.detalheOrdemServicos]
    this.resetFormLista()
  }


  atualizaDetalhes(lista: DetalheOrdemServico[], item: DetalheOrdemServico) {
    let index = lista.findIndex(itm => itm.idDetalhesOrdemServico === item.idDetalhesOrdemServico)
    if(index !== -1) {
      lista[index] = item
    }else {
      lista.push(item)
    }
    return lista;
  }

  removeIten() {
    let idx = this.idxRemove
    let exitsIdx = this.detalheOrdemServicos.findIndex((d) => d === idx)
    if(exitsIdx !== -1) {
      if (idx != null) {
        this.detalheOrdemServicos.splice(exitsIdx, 1)
      }
      this.detalhes.data = [...this.detalheOrdemServicos]
      this.removed = false
      this.resetFormLista()
    }
  }

  resetFormLista() {
    this.detalhesOS.controls['idDetalhesOrdemServico'].setValue('')
    this.detalhesOS.controls['ordemServicoId'].setValue('')
    this.detalhesOS.controls['descricao'].setValue('')
    this.detalhesOS.controls['valorUnitario'].setValue('')
    this.detalhesOS.controls['qtd'].setValue('')
    this.detalhesOS.controls['unidade'].setValue('')
  }

  loadFormDetalhes(item: DetalheOrdemServico) {
    this.detalhesOS.controls['idDetalhesOrdemServico'].setValue(item.idDetalhesOrdemServico)
    this.detalhesOS.controls['ordemServicoId'].setValue(item.ordemServicoId)
    this.detalhesOS.controls['descricao'].setValue(item.descricao)
    this.detalhesOS.controls['valorUnitario'].setValue(item.valorUnitario)
    this.detalhesOS.controls['qtd'].setValue(item.quantidade)
    this.detalhesOS.controls['unidade'].setValue(item.unidade)
  }
  

  getItemLista(detalhe: DetalheOrdemServico) {
    this.loadFormDetalhes(detalhe)
    this.removed = !this.removed
    this.idxRemove = detalhe;
  }

  onSubmit(): void {
    this.loading.show();
    let dados = this.osForm.value
    let detalhes = this.detalheOrdemServicos

    const req: OrdemServicosRequestModel = {
      idOrdemServico: dados.idOrdemServico,
      numeroOs: Number(this.osNumber),
      idCliente: dados.idCliente,
      solicitante: dados.solicitante,
      notaEntrada: dados.notaEntrada,
      notaSaida: dados.notaSaida,
      pedido:dados.pedido,
      orcamento: dados.orcamento,
      valorTotal: parseFloat(dados.valorTotal),
      prazo: Number(dados.prazo),
      dataCadastro: dados.lancamento,
      dataEntrega: dados.dataEntrega,
      dataPrevisaoEntrega: dados.dataPrevEntrega,
      detalhes: detalhes,
    }
    if(dados.idOrdemServico === '') {
      this.ordemServicosService.addNovaOs(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.loading.hide();
            this.router.navigate(['/ordemServico'])
           
          }
        },
        (error) => {
          this.loading.hide();
          this.toastrService.warning('Erro ao Cadastrar Ordem de Serviço', 'Atenção!');
        }
      )
    }else {
      this.ordemServicosService.putOs(req).subscribe(
        (result) => {
          if (result.statusCode === 204) {
            this.loading.hide();
            this.router.navigate(['/ordemServico'])          
          }
        },
        (error) => {
          console.info('Error: ', error)
          this.loading.hide();
          this.toastrService.warning('Erro ao Atualizar Ordem de Serviço', 'Atenção!');
        }
      )
    }
  }
  

  protected readonly numericOnly = numericOnly;

}
