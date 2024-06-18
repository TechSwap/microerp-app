export const validStr = (str: string | null) => !!str

export const formatingCNPJ = (str: string) => {
  return str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}


export const formatCep = (str: string) => {
  let hasDot = str.includes('.')
  let hasDash = str.includes('-')

  if (hasDot || hasDash) {
    let cep = str.replace(/[.-]/g, '');
    return cep;
  }

  return str;
}
