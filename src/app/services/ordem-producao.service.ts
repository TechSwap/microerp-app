import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Router} from "@angular/router";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";
import {OrdemServicosRequestModel} from "../models/request/ordem-servico.request.model";
import {Result} from "../models/result";
import {OrdemProducaoRequestModel} from "../models/request/ordem-producao-request.model";

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
}
