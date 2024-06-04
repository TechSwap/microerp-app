import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-modal-departamentos',
  templateUrl: './modal-departamentos.component.html',
  styleUrls: ['./modal-departamentos.component.css']
})
export class ModalDepartamentosComponent implements OnInit{

  isUpdate: boolean = false

  departamentoForm: FormGroup = this.formBuilder.group({
    'idDepartamento': [''],
    'nome': ['', Validators.required],
    'responsavel': ['', Validators.required],
    'centroCusto': ['']
  })

  constructor(
    public dialogRef: MatDialogRef<ModalDepartamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private loading: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {

  }



}
