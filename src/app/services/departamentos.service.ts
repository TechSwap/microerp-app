import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private _service: ClientService,
    private router: Router,
  ) { }


}
