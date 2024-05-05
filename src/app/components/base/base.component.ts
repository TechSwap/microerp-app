import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  public successNotification(msg: string): void {
    this.toastrService.success(msg, 'Successo.');
  }

  public warningNotification(msg: string): void {
    this.toastrService.warning(msg, 'Atenção!');
  }

  public errorNotification(msg: string): void {
    this.toastrService.error(msg, 'Error!');
  }

  public loadingShow(): void {
     this.spinner.show();
  }

  public loadingHide(): void {
    this.spinner.hide();
  }

  public getUser() {
    let user = localStorage.getItem('User')
    let objUser;
    if (user) {
      objUser = JSON.parse(user)
    }

    return objUser
  }



}
