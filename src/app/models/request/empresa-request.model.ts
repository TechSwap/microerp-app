export interface EmpresaRequest {
  idCliente?: string,
  idFornecedor?: string,
  nome: string,
  cnpj: string,
  inscricaoEstadual: string,
  contato1: string,
  contato2: string,
  email: string,
  isCliente?: boolean,
  isFornecedor?: boolean,
  cep: string,
  endereco: string,
  bairro: string,
  numero: string,
  cidade: string,
  estado: string
}
