import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Metadata, ResultList} from "../models/resultlist";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";
import {Result} from "../models/result";
import {Departamento} from "../models/response/departamento-response.model";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private _service: ClientService
  ) { }

  getListaDepartamentos(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/departamento/lista-departamentos?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()
    return this._service.get<ResultList>(route, token)
  }

  post(request: Departamento) {
    let route = formatingRoute('/departamento')
    let token = getToken()
    return this._service.post<Result>(route, token, request)
  }

  findOne(idDepartamento: string) {
    let route = formatingRoute(`/departamento?idDepartamento=${idDepartamento}`)
    let token = getToken()
    return this._service.get<Result>(route, token)
  }

  active(idDepartamento: string) {
    let route = formatingRoute(`/departamento/active?idDepartamento=${idDepartamento}`)
    let token = getToken()
    return this._service.post<Result>(route, token, null)
  }

  delete(idDepartamento: string) {
    let route = formatingRoute(`/departamento?idDepartamento=${idDepartamento}`)
    let token = getToken()
    return this._service.delete<Result>(route, token)
  }

  put(request: Departamento) {
    let route = formatingRoute('/departamento')
    let token = getToken()
    return this._service.put<Result>(route, token, request)
  }


}
