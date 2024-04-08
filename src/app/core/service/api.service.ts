// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = '/api/auth/login';
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(url, body, { headers: headers });
  }

  getOffers(
    response: any,
    type?: string,
    coin?: string,
    min?: string,
    max?: string
  ): Observable<any> {
    const url =
      '/api/p2p/index' + `?type=${type}&coin=${coin}&min=${min}&max=${max}`;
    const accessToken = response.accessToken;
    const cabecera = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });

    return this.http.get(url, { headers: cabecera });
  }
}
