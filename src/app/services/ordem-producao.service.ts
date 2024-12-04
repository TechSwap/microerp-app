import { Injectable } from '@angular/core';
import { ClientService } from "./client.service";
import { Router } from "@angular/router";
import { formatingRoute, getToken } from "../utils/http-helpers.utils";
import { Result } from "../models/result";
import {OrdemProducaoRequestModel, StartOp} from "../models/request/ordem-producao-request.model";
import { Metadata, ResultList } from "../models/resultlist";

@Injectable({
  providedIn: 'root'
})
export class OrdemProducaoService {
  _token: null | string = ''

  constructor(
    private _service: ClientService,
    private router: Router
  ) {
    this._token = getToken();
  }

  addNovaOp(request: OrdemProducaoRequestModel) {
    const route = formatingRoute('/ordemproducao/novaop');
    Object.keys(request).forEach((key) => {
      if (request["idOrdemProducao"] === null || request["idOrdemProducao"] === undefined || request["idOrdemProducao"] === "") {
        delete request["idOrdemProducao"];
      }
      if (request["numeroOp"] === null || request["numeroOp"] === undefined || request["numeroOp"] === 0) {
        delete request["numeroOp"];
      }
    });
    return this._service.post<Result>(route, this._token, request);
  }

  listaOps(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1;
    let pageSize = metaData != null ? metaData.pageSize : 200;

    const route = formatingRoute(`/ordemproducao/lista-ops?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`);

    return this._service.get<ResultList>(route, this._token);
  }

  getOneOP(idOrdemProducao: string) {
    const route = formatingRoute(
      `/ordemproducao/find-one?idOrdemProducao=${idOrdemProducao}`
    );
    return this._service.get<Result>(route, this._token);
  }

  startOp(req: StartOp) {
    const route = formatingRoute('/ordemproducao/start-op')
    return this._service.post<Result>(route, this._token, req)
  }
}
