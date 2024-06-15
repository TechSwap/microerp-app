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
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/cliente/lista-clientes?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()

    return this._service.get<ResultList>(route, token)
  }

  searchClientes(idCliente: string, cnpj: string, responsavel: string, email: string) {
    let clientes = idCliente !== '' ? `?idCliente=${idCliente}` : ''
    let cnpjComp = cnpj !== '' ? `${clientes === '' ? '?': '&'}cnpj=${cnpj}` : ''
    let respComp = responsavel !== '' ? `${clientes === '' && cnpj === '' ? '?': '&'}responsavel=${responsavel}` : ''
    let emailComp = email !== '' ? `${clientes === '' && cnpj === '' && responsavel === ''  ? '?': '&'}email=${email}` : ''

    let route =  clientes === '' && cnpj === '' && responsavel === '' && email === ''
      ? formatingRoute(`/cliente/lista-clientes?metaData.pageNumber=1&metaData.pageSize=15`)
      : formatingRoute(`/cliente/lista-clientes${clientes}${cnpjComp}${respComp}${emailComp}&metaData.pageNumber=1&metaData.pageSize=20`)
    let token = getToken()

    return this._service.get<ResultList>(route, token)
  }

  postcliente(request: EmpresaRequest) {
    let route = formatingRoute('/cliente')
    let token = getToken()
    return this._service.post<Result>(route, token, request)
  }

  findOneCliente(idCliente: string) {
    let route = formatingRoute(`/cliente?idCliente=${idCliente}`)
    let token = getToken()
    return this._service.get<Result>(route, token)
  }

  activeCliente(idCliente: string) {
    let route = formatingRoute(`/cliente/active?idCliente=${idCliente}`)
    let token = getToken()
    return this._service.post<Result>(route, token, null)
  }

  deleteCliente(idCliente: string) {
    let route = formatingRoute(`/cliente?idCliente=${idCliente}`)
    let token = getToken()
    return this._service.delete<Result>(route, token)
  }

  putCliente(request: EmpresaRequest) {
    let route = formatingRoute('/cliente')
    let token = getToken()
    return this._service.put<Result>(route, token, request)
  }
}
