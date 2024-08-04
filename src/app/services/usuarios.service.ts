import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { formatingRoute, getToken } from '../utils/http-helpers.utils';
import { Metadata, ResultList } from '../models/resultlist';
import { Result } from '../models/result';
import { UserRequest } from '../models/request/user-request.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  _token: null | string = '';

  constructor(private _service: ClientService) {
    this._token = getToken();
  }

  listaUsuarios(metaData: Metadata) {
    let pageNumber = metaData != null ? metaData.pageNumber : 1;
    let pageSize = metaData != null ? metaData.pageSize : 200;

    const route = formatingRoute(
      `/usuario/lista-usuarios?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`
    );
    return this._service.get<ResultList>(route, this._token);
  }

  searchUsuarios(nome: string, email:string, metaData: Metadata) {
    console.info("Searching: ", nome)
    let name = nome !== '' ? `?nome=${nome}` : '';
    let emailComp = email!== ''? `${name === ''? '?': '&'}email=${email}` : ''
    let pageNumber = metaData != null ? metaData.pageNumber : 1;
    let pageSize = metaData != null ? metaData.pageSize : 200;

    const route = name !== '' || emailComp !== ''
        ? formatingRoute(`/usuario/lista-usuarios${name}${emailComp}&metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`)
        : formatingRoute(`/usuario/lista-usuarios?metaData.pageNumber=${pageNumber}&metaData.pageSize=${pageSize}`);

    return this._service.get<ResultList>(route, this._token);
  }


  addUsuario(user: UserRequest) {
    const route = formatingRoute(`/user`);
    return this._service.post<Result>(route, this._token, user);
  }

  updateUsuario(user: UserRequest) {
    const route = formatingRoute(`/user`);
    return this._service.put<Result>(route, this._token, user);
  }

  getUser(id: string) {
    const route = formatingRoute(`/user?id=${id}`);
    return this._service.get<Result>(route, this._token);
  }

  activeUser(id: string) {
    const route = formatingRoute(`/user/active?id=${id}`);

    return this._service.post<Result>(route, this._token, null);
  }

  deleteUser(id: string) {
    const route = formatingRoute(`/user?id=${id}`);
    return this._service.delete<Result>(route, this._token);
  }
}
