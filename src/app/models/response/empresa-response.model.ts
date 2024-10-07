import { EmpresaComponent } from '../../modules/empresa/empresa/empresa.component';
export interface EmpresaResponse {
  "empresaId": string,
  "nomeFantasia": string,
  "razaoSocial": string,
  "cnpj": string,
  "inscricaoEstadual": string,
  "contato1": string,
  "email": string,
  "responsavel": string,
  "dataFundacao"?: Date,
  "tipoEmpresa": string,
  "logo": string,
  "dataCadastro"?: Date,
  "cep": string,
  "logradouro": string,
  "numero": string,
  "bairro": string,
  "cidade": string,
  "estado": string,
  "complemento": string
}
