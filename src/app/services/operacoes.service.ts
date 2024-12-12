import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { Result } from '../models/result';
import { formatingRoute, getToken } from '../utils/http-helpers.utils';
import { OperacaoRequestModel } from '../models/request/operacao-request.model';
import { Metadata, ResultList } from '../models/resultlist';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {
   _token: null | string = ''

  constructor(
    private client: ClientService,
    private router: Router,
  ) {
    this._token = getToken();
   }

  public addOperacao(request: OperacaoRequestModel) {
    const route = formatingRoute('/operacao');
    return this.client.post<Result>(route, this._token, request);
  }

  public listOperacoes(metaData: Metadata){
    let pageNumber = metaData != null ? metaData.pageNumber : 1;
    let pageSize = metaData != null ? metaData.pageSize : 200;
    const route = formatingRoute(`/operacao/lista-operacoes?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    return this.client.get<ResultList>(route, this._token);
  }
 
}
