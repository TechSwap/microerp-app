export interface OrdemServicoResponse {
  idOrdemServico: string;
  cliente: string;
  numeroOS: number;
  solicitante: string;
  valorTotal: number;
  itens: number;
  dataPrevisaoEntrega: Date;
}
