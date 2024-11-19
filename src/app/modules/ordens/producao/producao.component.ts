import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/base/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Cliente} from "../../../models/response/cliente-response.model";
import {SelectModel} from "../../../models/SelectModel";
import {Metadata} from "../../../models/resultlist";
import {ClientesService} from "../../../services/clientes.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.css']
})
export class ProducaoComponent extends BaseComponent implements OnInit {
  clientes: Cliente[] = [];
  dropClientes: SelectModel[] =  []

  searchOpForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
  })
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private loading: NgxSpinnerService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.getListaClientes()
  }

  getListaClientes() {
    this.loading.show();
    let metaData: Metadata = {
      pageNumber: 1,
      pageSize: 200,
    };
    this.clienteService.listClientes(metaData).subscribe(
      (result) => {
        if (result.statusCode === 200) {
          this.loading.hide();
          this.clientes = result.data
          this.dropClientes = this.loadDropClientes(result.data, this.dropClientes)
        }
      },
      (error) => {
        this.loading.hide();
      }
    );
  }

}
