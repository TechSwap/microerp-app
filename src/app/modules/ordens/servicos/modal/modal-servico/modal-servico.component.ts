import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-servico',
  templateUrl: './modal-servico.component.html',
  styleUrls: ['./modal-servico.component.css']
})
export class ModalServicoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalServicoComponent>,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void { }

}
