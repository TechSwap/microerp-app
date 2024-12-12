import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Operacao } from 'src/app/models/response/operacoes-response.model';
import { Metadata } from 'src/app/models/resultlist';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-grid-operacoes',
  templateUrl: './grid-operacoes.component.html',
  styleUrls: ['./grid-operacoes.component.css']
})
export class GridOperacoesComponent extends BaseComponent implements  OnInit{
  displayedColumns: string[] = ['operacao', 'departamento', 'responsavel', 'status', 'actions'];
  operacoes!: MatTableDataSource<Operacao>;

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 15,
  }

  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator; 
  
  constructor(
    private loading: NgxSpinnerService,
    public dialog: MatDialog,
    private operacoesService: OperacoesService   
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaOperacoes(this.metaData)
  }

  public loadGridOperacoes(list: Operacao[], totalRecords: number | undefined) {
    this.operacoes = new MatTableDataSource<Operacao>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  getListaOperacoes(metaData: Metadata) {
    this.loading.show();
    this.operacoesService.listOperacoes(metaData).subscribe(
      (result) => {       
        if(result === null) {
          this.loadGridOperacoes([], 0)
        }else {
          if (result.statusCode === 200 || result.statusCode === 204) {
            this.loadGridOperacoes(result.data, result.metaData.totalRecords)
          } 
        }
        this.loading.hide();

      }, (error) => {
        this.loading.hide();
      })
  }

  pageChangeEvent(event: PageEvent) {
    let metaData: Metadata = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.getListaOperacoes(metaData)
  }
} 
