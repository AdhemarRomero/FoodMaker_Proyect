import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = environment.API_BACKEND

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  private getToken() {
    const jwt = sessionStorage.getItem("jwt")
    return jwt
  }

  get<T>(endpoint: string) {
    const jwt = this.getToken()

    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${jwt}`)

    return this.httpClient.get<T>(`${this.url}${endpoint}`, { headers })
  }

  post<T, U>(endpoint: string, params: U) {
    const jwt = this.getToken()

    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${jwt}`)
  
    return this.httpClient.post<T>(`${this.url}${endpoint}`, params, { headers })
  }

  patch<T, U>(endpoint: string, params: U) {
    const jwt = this.getToken()

    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${jwt}`)

    return this.httpClient.patch<T>(`${this.url}${endpoint}`, params, { headers })
  }

  delete<T>(endpoint: string) {
    const jwt = this.getToken()

    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${jwt}`)
    
    return this.httpClient.delete<T>(`${this.url}${endpoint}`, { headers })
  }
}
