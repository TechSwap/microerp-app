import {DetalheOrdemServico} from "../ordemServico.model";

export interface OrdemServicosRequestModel {
  numeroOs: number,
  idCliente: string,
  solicitante: string,
  notaEntrada: string,
  notaSaida: string,
  pedido: string,
  orcamento: string,
  valorTotal: number,
  prazo: number,
  dataCadastro: Date,
  dataEntrega: Date,
  dataPrevisaoEntrega: Date,
  detalhes: DetalheOrdemServico[]
}


export interface ProdutoRequestModel {
  idProduto: string
  valorUnitario: number
  quantidade: number
}
