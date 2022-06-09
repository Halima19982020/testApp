import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../model/role";
import {Observable} from "rxjs";
import {GestionAccessControl} from "../model/gestion-access-control";

@Injectable({
  providedIn: 'root'
})
export class GestionAccessControlService {

  private apiServerUrl: string;
  constructor(private http: HttpClient) {
    this.apiServerUrl = 'http://localhost:9091/gestion';
  }
  public addGestion(gestion: GestionAccessControl): Observable<GestionAccessControl> {
    return this.http.post<GestionAccessControl>(`${this.apiServerUrl}/add`, gestion);
  }
}
