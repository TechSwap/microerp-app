import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { Metadata, ResultList } from '../models/resultlist';
import {formatingRoute, getToken} from '../utils/http-helpers.utils';
import { Result } from '../models/result';
import { OrdemServicosRequestModel } from '../models/request/ordem-servico.request.model';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicosService {
  _token: null | string = ''
  constructor(
    private _service: ClientService,
    private router: Router) {
    this._token = getToken();
  }

  listaOs(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1;
    let pageSize = metaData != null ? metaData.pageSize : 200;

    const route = formatingRoute(
      `/ordemservico/lista-os?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`
    );

    return this._service.get<ResultList>(route, this._token);
  }

  searchOs(idCliente: string, solicitante: string, dataLancamento: string) {
    let pageNumber = 1;
    let pageSize =  200;

    let cliente = idCliente === '' ? '' : `?idCliente=${idCliente}`;
    let lancamento = dataLancamento === '' ? '' : `${ idCliente === '' ? '?': '&'}dataLancamento=${dataLancamento}`;
    let solicitanteReq = solicitante === '' ? '' : `${ idCliente === '' && dataLancamento === '' ? '?': '&'}solicitante=${solicitante}`;


    const route =  cliente !== '' || lancamento !== '' || solicitanteReq !== ''
      ? formatingRoute(`/ordemservico/lista-os${cliente}${lancamento}${solicitanteReq}&metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
      : formatingRoute(`/ordemservico/lista-os?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`);

    return this._service.get<ResultList>(route, this._token);
  }

  getNovaOS() {
    const route = formatingRoute('/ordemservico/novaos');

    return this._service.get<Result>(route, this._token);
  }

  addNovaOs(request: OrdemServicosRequestModel) {

    const route = formatingRoute('/ordemservico');

    Object.keys(request).forEach((key) => {
      if (request["dataEntrega"] === null || request["dataEntrega"] === undefined || request["dataEntrega"] === "") {
        delete request["dataEntrega"];
      }
    });
    return this._service.post<Result>(route, this._token, request);
  }

  getOneOs(idOrdemServico: string) {
    const route = formatingRoute(
      `/ordemservico/find-one?idOrdemServico=${idOrdemServico}`
    );

    return this._service.get<Result>(route, this._token);
  }

  putOs(request: OrdemServicosRequestModel) {
    const route = formatingRoute('/ordemservico');

    return this._service.put<Result>(route, this._token, request);
  }

  getRelatorio() {
    const route = formatingRoute('/ordemservico/relatorio')
    return this._service.get<Result>(route, this._token)
  }
}
