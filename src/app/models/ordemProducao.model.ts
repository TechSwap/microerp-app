export interface OrdemProducaoModel {
  idOrdemProducao: string;
  idOrdemServico: string;
  numeroOp: number;
  idCliente: string;
  prazo: number;
  status: number;
  dataCadastro: Date;
  dataPrevisaoEntrega: Date;
  Detalhes: DetalheOrdemProducao[];
}

export interface DetalheOrdemProducao {
  index?: number;
  idDetalhesOrdemProducao?: string;
  idOrdemProducao: string;
  descricao: string;
  quantidade: number;
  unidade: string;
  prazoEntrega?: Date;
}
