import {Component, OnInit} from '@angular/core';
import {SelectModel} from "../../../models/SelectModel";
import {BaseComponent} from "../../shared/base/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FornecedoresService} from "../../../services/fornecedores.service";
import {Metadata} from "../../../models/resultlist";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent extends BaseComponent implements OnInit {
  dropFornecedores: SelectModel[] =  []

  metaData: Metadata = {
    pageNumber: 1,
    pageSize: 200,
  };

  searchComprasForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
    'solicitante': [''],
    'dataPedido': ['']
  })

  constructor(
    private fornecedorService: FornecedoresService,
    private loading: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaFornecedores();
  }

  getListaFornecedores() {
    this.loading.show();
    this.fornecedorService.listFornecedores(this.metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loading.hide();
          this.dropFornecedores = this.loadDropFornecedor(result.data, this.dropFornecedores)
        }
      },
      (error) => {
        this.loading.hide();
      }
    );
  }

}
