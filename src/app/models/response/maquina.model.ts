export interface Maquina {
  idMaquina: string;
  numeroSerie: string;
  fabricante: string;
  nome: string;
  status: number | string;
  vendida: boolean;
  ativoFixo?: string;
  idDepartamento?: string;
}
