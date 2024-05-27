export const numericOnly = (event: any): boolean => {
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}

export const dataPrevEntrega = (data: Date, dias: number): Date => {
  const newData = new Date(data.getTime());
  let diasAdicionados = 0;

  for (let i = 0; diasAdicionados < dias; i++) {
    newData.setDate(newData.getDate() + 1);
    if (newData.getDay() !== 0 && newData.getDay() !== 6) {
      diasAdicionados++;
    }
  }

  return newData;

}
