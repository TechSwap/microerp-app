import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CancellyOp } from 'src/app/models/request/ordem-producao-request.model';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';

@Component({
  selector: 'app-cancelly-ordem',
  templateUrl: './cancelly-ordem.component.html',
  styleUrls: ['./cancelly-ordem.component.css']
})
export class CancellyOrdemComponent extends BaseComponent implements OnInit {
  maxChars = 150;
  os: any;

  cancellyOS:  FormGroup = this.formBuilder.group({
    'idOrdemProducao': [''],
    'motivo': ['', [Validators.required, Validators.maxLength(this.maxChars)]]
  })
  idOrdemProducao: string = '';

  ngOnInit(): void {   
    this.idOrdemProducao = this.data.Itens.idOrdemProducao    
    this.loadData()
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordemProducaoService: OrdemProducaoService,
    public dialogRef: MatDialogRef<CancellyOrdemComponent>,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  loadData() {
    this.cancellyOS.controls['idOrdemProducao'].setValue(this.idOrdemProducao)
  }

  onSubmit() {
    console.info('cancellyOS', this.cancellyOS.value)
    let req: CancellyOp = {
      IdOrdemProducao: this.idOrdemProducao,
      Motivo: this.cancellyOS.controls['motivo'].value
    }

    console.info('req', req)

    this.ordemProducaoService.cancellyOp(req).subscribe(
      (result) => {
        if(result.statusCode === 204) {
          this.dialogRef.close();
        }
      }
    )
  }


}