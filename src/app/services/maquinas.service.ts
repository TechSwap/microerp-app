import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Router} from "@angular/router";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";
import {Result} from "../models/result";
import {Maquina} from "../models/response/maquina.model";
import {Metadata, ResultList} from "../models/resultlist";
import {OrdemServicosRequestModel} from "../models/request/ordem-servico.request.model";

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {

  constructor(
    private client: ClientService,
    private router: Router,
  ) { }

  listMaquinas(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/maquina/lista-maquinas?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()

    return this.client.get<ResultList>(route, token)
  }
  postMaquina(request: Maquina) {
    let route = formatingRoute('/maquina')
    let token = getToken()
    return this.client.post<Result>(route, token, request)
  }

  activeMaquina(request: Maquina) {
    let route = formatingRoute(`/maquina/active?idMaquina=${request.idMaquina}`)
    let token = getToken()
    return this.client.post<Result>(route, token, null)
  }

  sellMaquina(request: Maquina) {
    let route = formatingRoute(`/maquina/sell?idMaquina=${request.idMaquina}`)
    let token = getToken()
    return this.client.post<Result>(route, token, null)
  }

  deleteMaquina(request: Maquina) {
    let route = formatingRoute(`/maquina/delete?idMaquina=${request.idMaquina}`)
    let token = getToken()
    return this.client.delete<Result>(route, token)
  }

  findOneMaquina(request: Maquina) {
    let route = formatingRoute(`/maquina/find-one?idMaquina=${request.idMaquina}`)
    let token = getToken()
    return this.client.get<Result>(route, token)
  }

  putMaquina(request: Maquina) {
    const route = formatingRoute('/maquina');
    let token = getToken()
    return this.client.put<Result>(route, token, request);
  }



  searchMaquinas(idDepartamento: string, numeroSerie: string, fabricante: string) {
    let pageNumber = 1;
    let pageSize =  200;

    let departamento = idDepartamento === '' ? '' : `?idDepartamento=${idDepartamento}`;
    let nserie = numeroSerie === '' ? '' : `${ idDepartamento === '' ? '?': '&'}numeroSerie=${numeroSerie}`;
    let fabr = fabricante === '' ? '' : `${ idDepartamento === '' && numeroSerie === '' ? '?': '&'}fabricante=${fabricante}`;

    let token = getToken()

    const route =  departamento !== '' || nserie !== '' || fabr !== ''
      ? formatingRoute(`/maquina/lista-maquinas${departamento}${nserie}${fabr}&metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
      : formatingRoute(`/maquina/lista-maquinas?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`);

    return this.client.get<ResultList>(route, token);
  }
}
