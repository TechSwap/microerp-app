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

export const getBase64 = async (file: File): Promise<string | ArrayBuffer | null> => {
  console.info('file: ', file.name);
  let base64Data: string | ArrayBuffer | null = '';
  let reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      base64Data = await reader.result;
      resolve(base64Data);
    };
    reader.onerror = (error) => {
      base64Data = null;
      reject(error);
    };
  });
};
