import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Fornecedor} from "../../../../../models/response/fornecedor-response.model";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../../../../models/response/cliente-response.model";
import {Departamento} from "../../../../../models/response/departamento-response.model";
import {Metadata} from "../../../../../models/resultlist";

@Component({
  selector: 'app-grid-departamentos',
  templateUrl: './grid-departamentos.component.html',
  styleUrls: ['./grid-departamentos.component.css']
})
export class GridDepartamentosComponent implements OnInit{

  displayedColumns: string[] = ['nome', 'responsavel', 'centroCusto', 'status', 'actions'];
  departamentos!: MatTableDataSource<Departamento>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  totalRecords? = 0;
  pageSize = 15;
  pageIndex = 0;

  constructor(
    private loading: NgxSpinnerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 15,
    }

  }

  public loadGridDepartamento(list: Departamento[], totalRecords: number | undefined ) {
    this.departamentos = new MatTableDataSource<Departamento>(list)
    this.totalRecords = totalRecords != 0 ? totalRecords : 0
  }

  edit(row: Departamento) {}

  delete(row: Departamento) {

  }

  active(row: Departamento) {

  }

  pageChangeEvent(event: PageEvent) {}

}
