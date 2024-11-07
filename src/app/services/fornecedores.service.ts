import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Metadata, ResultList} from "../models/resultlist";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";
import {EmpresaRequest} from "../models/request/empresa-request.model";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  constructor(
    private _service: ClientService
  ) {  }

  listFornecedores(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/fornecedor/lista-fornecedores?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()
    return this._service.get<ResultList>(route, token)
  }

  postFornecdor(request: EmpresaRequest) {
    let route = formatingRoute('/fornecedor')
    let token = getToken()
    return this._service.post<Result>(route, token, request)
  }

  getFornecedor(idFornecedor: string) {
    let route = formatingRoute(`/fornecedor?idFornecedor=${idFornecedor}`)
    let token = getToken()
    return this._service.get<Result>(route, token)
  }

  updateFornecedor(request: EmpresaRequest) {
    let route = formatingRoute('/fornecedor')
    let token = getToken()
    return this._service.put<Result>(route, token, request)
  }

  activeFornecedor(idFornecedor: string) {
    let route = formatingRoute(`/fornecedor/active?idFornecedor=${idFornecedor}`)
    let token = getToken()
    return this._service.post<Result>(route, token, null)
  }

  deleteFornecedor(idFornecedor: string) {
    let route = formatingRoute(`/fornecedor?idFornecedor=${idFornecedor}`)
    let token = getToken()
    return this._service.delete<Result>(route, token)
  }

  searchFornecedor(idFonecedor: string, cnpj: string, responsavel: string, email: string) {
      let fornecedor = idFonecedor !== '' ? `?idCliente=${idFonecedor}` : ''
      let cnpjComp = cnpj !== '' ? `${fornecedor === '' ? '?': '&'}cnpj=${cnpj}` : ''
      let respComp = responsavel !== '' ? `${fornecedor === '' && cnpj === '' ? '?': '&'}responsavel=${responsavel}` : ''
      let emailComp = email !== '' ? `${fornecedor === '' && cnpj === '' && responsavel === ''  ? '?': '&'}email=${email}` : ''

      let route =  fornecedor === '' && cnpj === '' && responsavel === '' && email === ''
        ? formatingRoute(`/cliente/lista-clientes?metaData.pageNumber=1&metaData.pageSize=15`)
        : formatingRoute(`/cliente/lista-clientes${fornecedor}${cnpjComp}${respComp}${emailComp}&metaData.pageNumber=1&metaData.pageSize=20`)
      let token = getToken()
      return this._service.get<ResultList>(route, token)
  }
}
