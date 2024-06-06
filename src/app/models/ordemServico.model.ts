export interface OrdemServicoModel {
  idOrdemServico: string;
  numeroOS: number;
  idCliente: string;
  solicitante: string;
  notaSaida: string;
  notaEntrada: string;
  pedido: string;
  orcamento: string;
  valorTotal: number;
  prazo: number;
  dataCadastro: Date;
  dataPrevisaoEntrega: Date;
  dataEntrega: Date;
  Detalhes: DetalheOrdemServico[];
}

export interface DetalheOrdemServico {
  idDetalhesOrdemServico?: string;
  ordemServicoId: string;
  descricao: string;
  valorUnitario: number;
  quantidade: number;
  unidade: string;
}
