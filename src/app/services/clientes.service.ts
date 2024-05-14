import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { Metadata, ResultList } from '../models/resultlist';
import { formatingRoute, getToken } from '../utils/http-helpers.utils';
import { Result } from '../models/result';
import { EmpresaRequest } from '../models/request/empresa-request.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private _service: ClientService,
    private router: Router,
  ) { }

  listClientes(metaData: Metadata) {

    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 20

    let route = formatingRoute(`/cliente/lista-clientes?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)

    return this._service.get<ResultList>(route, null)
  }


  postcliente(request: EmpresaRequest) {
    let route = formatingRoute('/cliente')
    console.info('Rota: ', route)

    let token = getToken()

    return this._service.post<Result>(route, token, request)
  }
}
