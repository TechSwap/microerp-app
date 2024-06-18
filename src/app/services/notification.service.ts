import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toastConfig = {
    timeOut: 1500,
    closeButton: true,
    progressBar: true
  }

  constructor(
    private notificationService: ToastrService
  ) { }

  public success(msg: string) {
    this.notificationService.success(msg, 'Sucesso', this.toastConfig);
  }

  public error(msg:string) {
    this.notificationService.error(msg, 'Erro !', this.toastConfig);
  }

  public warning(msg:string) {
    this.notificationService.warning(msg, 'Atenção !', this.toastConfig);
  }
}
