import { Injectable } from '@angular/core';
import { EmpresaRequest } from '../models/request/empresa-request.model';
import { Result } from '../models/result';
import { formatingRoute, getToken } from '../utils/http-helpers.utils';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private _service: ClientService
  ) { }

  getEmpresa() {
    let route = formatingRoute(`/empresa`)
    let token = getToken()
    return this._service.get<Result>(route, token)
  }

  putEmpresa(request: EmpresaRequest) {
    let route = formatingRoute('/empresa')
    let token = getToken()
    return this._service.put<Result>(route, token, request)
  }
}
