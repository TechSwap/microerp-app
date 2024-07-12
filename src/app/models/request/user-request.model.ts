export interface UserRequest {
  userId?: string;
  nome: string;
  idDepartamento: string;
  email: string;
  ativo?: boolean;
  senha: string;
  confirmarSenha: string;
}
