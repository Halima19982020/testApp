import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../model/role";
import {Observable} from "rxjs";
import {ClientFonctionalite} from "../model/client-fonctionalite";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiServerUrl: string;
  constructor(private http: HttpClient) {
    this.apiServerUrl = 'http://localhost:9091/client';
  }
  public addClient(client : ClientFonctionalite): Observable<ClientFonctionalite> {
    return this.http.post<ClientFonctionalite>(`${this.apiServerUrl}/add`, client);
  }
}
