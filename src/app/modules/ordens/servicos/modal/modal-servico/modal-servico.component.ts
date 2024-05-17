import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {DetalheOrdemServico, OrdemServicoModel} from 'src/app/models/ordemServico.model';
import { Cliente } from 'src/app/models/response/cliente-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { UnidadeMedida } from 'src/app/models/unidade.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { OrdemServicosService } from 'src/app/services/ordem-servicos.service';

@Component({
  selector: 'app-modal-servico',
  templateUrl: './modal-servico.component.html',
  styleUrls: ['./modal-servico.component.css'],
})
export class ModalServicoComponent implements OnInit {
  osNumber: number = 0;
  conteudo = false;
  clientes: Cliente[] = [];
  detalheOrdemServicos: DetalheOrdemServico[] = [];

  unidades: UnidadeMedida[] = [
    { value: 'PC', viewValue: 'Pecas' },
    { value: 'MT', viewValue: 'Metros' },
    { value: 'LT', viewValue: 'Litros' },
  ];

  os: any

  public descricao: string = '';
  public valorUnitario: number = 0;
  public qtd: number = 0;
  public unidade: string = '';

  displayedColumns: string[] = ['descricao', 'valorUnitario', 'qtd', 'unidade'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClientesService,
    private ordemServicosService: OrdemServicosService,
    public dialogRef: MatDialogRef<ModalServicoComponent>,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.os = this.data.OS
    console.info('data: ', this.os);

    if(this.os.numeroOS !== 0) {
      this.osNumber = this.data.numeroOS;
    }else {
      this.getLastOs();
    }

    this.getListaClientes();
  }

  getLastOs() {
    this.ordemServicosService.getNovaOS().subscribe(
      (result) => {
        if (result.statusCode === 200) {
          console.info('Result: ', result.data);
          this.osNumber = result.data.ordemServico;
        } else {
          console.info('Erro ao Listar: ', result.errors);
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

  onCloseClick(): void {
    this.dialogRef.close();
  }

  mostraConteudo() {
    this.conteudo = !this.conteudo;
  }

  addListaDetalhes() {
    let details: DetalheOrdemServico = {
      descricao: this.descricao,
      valorUnitario: this.valorUnitario,
      quantidade: this.qtd,
      unidade: this.unidade,
    };

    this.detalheOrdemServicos.push(details);
    this.resetFormLista();
  }

  resetFormLista() {
    this.descricao = '';
    this.valorUnitario = 0;
    this.qtd = 0;
    this.unidade = '';
  }

  getListaClientes() {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };

    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.clientes = result.data;
        } else {
          console.info('Erro ao Listar: ', result.errors);
          this.toastrService.warning('Erro ao Listar', 'Atenção!');
        }
      },
      (error) => {
        this.toastrService.warning('Erro ao Listar', 'Atenção!');
      }
    );
  }

  onSubmit(): void {}
}
