import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Router} from "@angular/router";
import {Metadata, ResultList} from "../models/resultlist";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";
import {EmpresaRequest} from "../models/request/empresa-request.model";
import {Result} from "../models/result";
import { Funcionario } from '../models/response/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(
    private client: ClientService
  ) { }

  listFuncionarios(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/funcionario/lista-funcionarios?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()

    return this.client.get<ResultList>(route, token)
  }

  postFuncionario(request: Funcionario) {
    let route = formatingRoute('/funcionario')
    let token = getToken()
    return this.client.post<Result>(route, token, request)
  }

  getCodigoFuncionario() {
    let route = formatingRoute('/funcionario/codigo')
    let token = getToken()
    return this.client.get<Result>(route, token)
  }

  activeFuncionario(idFuncionario: string) {
    let route = formatingRoute(`/funcionario/active?idFuncionario=${idFuncionario}`)
    let token = getToken()
    return this.client.post<Result>(route, token, null)
  }

  findOneFuncionario(idFuncionario: string) {
    let route = formatingRoute(`/funcionario?idFuncionario=${idFuncionario}`)
    let token = getToken()
    return this.client.get<Result>(route, token)
  }

  putFuncionario(request: Funcionario) {
    let route = formatingRoute('/funcionario')
    let token = getToken()
    return this.client.put<Result>(route, token, request)
  }

  deleteFuncionario(idFuncionario: string) {
    let route = formatingRoute(`/funcionario?idFuncionario=${idFuncionario}`)
    let token = getToken()
    return this.client.delete<Result>(route, token)
  }

  searchFuncionarios(departamentoId: string, nome: string, funcao: string) {
    let departamento = departamentoId !== '' ? `?departamentoId=${departamentoId}` : ''
    let nomeFunc = nome !== '' ? `${departamento === '' ? '?': '&'}nome=${nome}` : ''
    let funcaoFunc = funcao !== '' ? `${departamento === '' && nomeFunc === '' ? '?': '&'}funcao=${funcao}` : ''

    let route =  departamento === '' && nomeFunc === '' && funcaoFunc === ''
      ? formatingRoute(`/funcionario/lista-funcionarios?metaData.pageNumber=1&metaData.pageSize=15`)
      : formatingRoute(`/funcionario/lista-funcionarios${departamento}${nomeFunc}${funcaoFunc}&metaData.pageNumber=1&metaData.pageSize=20`)

    let token = getToken()

    return this.client.get<ResultList>(route, token)
  }
}
