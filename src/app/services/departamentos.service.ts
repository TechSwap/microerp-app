import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Router} from "@angular/router";
import {Metadata, ResultList} from "../models/resultlist";
import {formatingRoute, getToken} from "../utils/http-helpers.utils";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private client: ClientService
  ) { }

  getListaDepartamentos(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1
    let pageSize = metaData != null ? metaData.pageSize : 15

    let route = formatingRoute(`/departamento/lista-departamentos?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
    let token = getToken()
    return this.client.get<ResultList>(route, token)
  }


}
