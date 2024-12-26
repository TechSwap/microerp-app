import {DetalheOrdemProducao} from "../ordemProducao.model";

export interface OrdemProducaoRequestModel {
  idOrdemProducao?: string;
  numeroOp?: number;
  idOrdemServico: string;
  idCliente: string;
  prazo: number;
  status?: number;
  detalhes: DetalheOrdemProducao[];
}

export interface Itens {
  Id: string;
  Descricao: string;
  Quantidade: number;
  Status: number;
}

export interface StartOp {
  IdOrdemProducao: string
  Detalhes: Detalhes[]
}

export interface CancellyOp {
  IdOrdemProducao: string
  Motivo: string
}

export interface Detalhes {
  idOrdemProducaoDetalhe?: string;
  idOperacao?: string;
  idFuncionario?: string;
  horasTrabalhadas?: number
}


