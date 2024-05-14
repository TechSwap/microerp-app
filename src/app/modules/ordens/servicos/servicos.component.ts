import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalServicoComponent } from './modal/modal-servico/modal-servico.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {

  }


  openAddOS() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      width: '700px'
    };


    const dialogRef = this.dialog.open(ModalServicoComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
