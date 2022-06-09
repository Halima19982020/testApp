import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../model/role";
import {Observable} from "rxjs";
import {InterventionFonctionalite} from "../model/intervention-fonctionalite";

@Injectable({
  providedIn: 'root'
})
export class InterventionFonctionalitesService {

  private apiServerUrl: string;
  constructor(private http: HttpClient) {
    this.apiServerUrl = 'http://localhost:9091/intervention';
  }
  public addInterventionFonctionalite(intervention: InterventionFonctionalite): Observable<InterventionFonctionalite> {
    return this.http.post<InterventionFonctionalite>(`${this.apiServerUrl}/add`, intervention);
  }
}
