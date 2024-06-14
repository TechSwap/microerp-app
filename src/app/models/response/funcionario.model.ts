export interface Funcionario {
  idFuncionario: string;
  codigo: string;
  nome: string
  departamentoId?: string;
  departamento?: string;
  centroCusto?: string;
  funcao: string;
  valorHora?: number;
  ativo?: boolean
}
