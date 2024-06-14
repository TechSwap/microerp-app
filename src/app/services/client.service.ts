import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { headers } from '../utils/http-helpers.utils';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

   public get<Result>(url: string, token:string | null ): Observable<Result>{
    let opt = headers(token)

    return this.http.get<Result>(url, opt);
  }

  public getList<ResultList>(url: string, token: string | null): Observable<ResultList> {
    let opt = headers(token)

    return this.http.get<ResultList>(url, opt);
  }

  public post<Result>(url: string, token: string | null, item: any): Observable<Result> {
    let opt = headers(token)
    return this.http.post<Result>(url, item, opt);
  }

  public put<Result>(url: string, token: string | null, item: any): Observable<Result> {
    let opt = headers(token)

    return this.http.put<Result>(url, item, opt);
  }

  public delete<Result>(url: string, token: string | null): Observable<Result> {
    let opt = headers(token)
    return this.http.delete<Result>(url, opt);
  }
}
