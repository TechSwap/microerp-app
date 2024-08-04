import { HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment.development"
import { validStr } from "./string-helpers.utils"
import { UserResponseModel } from "../models/response/user-response.model"

export const formatingRoute = (pathRoute: string) => {
  const urlApi = environment.UrlApi
  return `${urlApi}${pathRoute}`
}

export const headers = (token: string | null ) => {
  let opt = {}
  if (validStr(token)) {
    opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': `Bearer ${token}`,
      })
    }
  } else {
    opt = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
      })
    }
  }
  return opt;
}

export const getToken = () => {
  let token = localStorage.getItem('accessToken')
  return token;
}

export const getUser = () => {
  let user = localStorage.getItem('User')
  let objUser;
  if (user) {
    objUser = JSON.parse(user)
  }
  return objUser;
}

export const saveToken = (user: UserResponseModel) => {
  localStorage.setItem('accessToken', user.accessToken)
  localStorage.setItem('expires_at', JSON.stringify(new Date().getDate()+1))
  localStorage.setItem('User', JSON.stringify(user))
}

export const validToken = () => {
  let expiresAt = localStorage.getItem('expires_at')
  if(expiresAt) {
    let today = new Date().getDate();
    let expiresIn = JSON.parse(expiresAt)
    return today < expiresIn
  } else {
    return false
  }
}
