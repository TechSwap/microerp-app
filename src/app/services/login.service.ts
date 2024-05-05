import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { LoginRequestModel } from '../models/request/login-request.model';
import { Result } from '../models/result';
import { formatingRoute, getUser, validToken } from '../utils/http-helpers.utils';
import { validStr } from '../utils/string-helpers.utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private client: ClientService,
    private router: Router,
  ) { }

   public login(credentials: LoginRequestModel) {
    let route = formatingRoute('/login')

    return this.client.post<Result>(route, null, credentials)
  }

  public refreshToken(refreshToken: string) {
    let routeRefreshToken = formatingRoute(`/token/refresh-token?refreshToken=${refreshToken}`)

    return this.client.post<Result>(routeRefreshToken, null, null)
  }

  public logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  public isAuthenticaded() {
    let user = getUser()
    let token = localStorage.getItem('accessToken')

    let isValidToken = false;

    if (validStr(token)) {
      isValidToken = validToken()

      if (isValidToken === false) {
        this.refreshToken(user.refreshToken)
          .subscribe((result: Result) => {
            if (result.statusCode === 200) {
              localStorage.removeItem('accessToken')

              localStorage.setItem('accessToken', result.data)
              isValidToken = true
            } else {
              isValidToken =  false;
             }
          }, (error) => {
            isValidToken = false
        })
      }
    }

    return isValidToken
  }
}
