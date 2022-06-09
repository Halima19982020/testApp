import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../model/role";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServerUrl: string;
  constructor(private http: HttpClient) {
    this.apiServerUrl = 'http://localhost:9091/role';
  }
  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerUrl}/add`, role);
  }
}
