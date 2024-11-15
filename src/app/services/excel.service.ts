import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as _  from 'lodash';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = { Sheets: { 'data': workSheet }, SheetNames: ['data'] }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    this.saveAsExcelFile(excelBuffer, excelFileName)
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([new Uint8Array(buffer.length).map((_, index) => buffer.charCodeAt(index))], {
      type: EXCEL_TYPE
    })
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION)
  }
}
