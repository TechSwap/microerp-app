export interface OrdemProducaoRequestModel {
  idOrdemProducao?: string;
  numeroOp?: number;
  idOrdemServico: string;
  idCliente: string;
  prazo: number;
  status?: number
}
