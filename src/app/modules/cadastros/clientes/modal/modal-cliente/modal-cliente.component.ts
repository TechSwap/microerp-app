import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

   constructor(
    public dialogRef: MatDialogRef<ModalClienteComponent>,
    private baseService: BaseService,
    private _formBuilder: FormBuilder

  ) { }

   ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void { }

  buscaCep(e: any) {
    this.baseService.getCep(e.target.value).subscribe(result => {
      if (result != null) {

      }
    }, (error) => {
      console.info('Error BuscaCep: ', error)
    })
  }

}
