export interface Maquina {
  idMaquina: string;
  numeroSerie: string;
  fabricante: string;
  nome: string;
  status: number
  vendida?: boolean
  ativoFixo?: string
  idDepartamento?: string
}
