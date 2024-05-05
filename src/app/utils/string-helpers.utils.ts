export const validStr = (str: string | null) => !!str

export const formatingCNPJ = (str: string) => {
  return str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
 }
