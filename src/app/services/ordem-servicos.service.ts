import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { Metadata, ResultList } from '../models/resultlist';
import { formatingRoute } from '../utils/http-helpers.utils';
import { Result } from '../models/result';
import { OrdemServicosRequestModel } from '../models/request/ordem-servico.request.model';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicosService {

  constructor(
    private _service: ClientService,
    private router: Router,
  ) { }


  listaOs(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 20

    const route = formatingRoute(`/ordemservicos/lista-os?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)

     return this._service.get<ResultList>(route, null)

  }

  getNovaOS() {
    const route = formatingRoute('ordemservico/novaos')

    return this._service.get<Result>(route, null)
  }

  addNovaOs(request: OrdemServicosRequestModel) {

    const route = formatingRoute('/ordemservico')

    return this._service.post<Result>(route, null, request)
  }

  getOneOs(idOrdemServico: string) {
    const route = formatingRoute(`/ordemservico?idOrdemServico=${idOrdemServico}`)

    return this._service.get<Result>(route, null)
  }

  findOs() {}

}
