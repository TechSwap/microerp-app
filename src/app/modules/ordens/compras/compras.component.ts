import {Component, OnInit} from '@angular/core';
import {SelectModel} from "../../../models/SelectModel";
import {BaseComponent} from "../../shared/base/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent extends BaseComponent implements OnInit {
  dropFornecedores: SelectModel[] =  []

  searchComprasForm: FormGroup = this.formBuilder.group({
    'idCliente': [''],
    'solicitante': [''],
    'dataPedido': ['']
  })

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
