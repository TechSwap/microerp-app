export interface OrdemServicosRequestModel {
  numeroOs: number,
  idCliente: string,
  solicitante: string,
  notaEntrada: string,
  pedido: string,
  orcamento: string,
  valorTotal: number,
  prazo: number
  produtos: ProdutoRequestModel[]
}


export interface ProdutoRequestModel {
  idProduto: string
  valorUnitario: number
  quantidade: number
}
