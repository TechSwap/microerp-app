import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { CepResponse } from '../models/response/cep-response.model';
import {formatCep} from "../utils/string-helpers.utils";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private _service: ClientService,
  ) { }

  getCep(cep: string) {
    cep = formatCep(cep)

    let route = `https://viacep.com.br/ws/${cep}/json/`

    return this._service.get<CepResponse>(route, null)
  }
}
