import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseSight } from "../models/base-sight";
import { TableRowSight } from "../models/table-row-sight"
@Injectable({ providedIn: 'root' })

export class SightService {
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly sightApi = `${this.baseUrl}api/Events`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerSight(sight: BaseSight): Observable<BaseSight> {
    return this.http.post<BaseSight>(this.sightApi, sight);
  }

  getAllSights(): Observable<TableRowSight[]> {
    return this.http.get<TableRowSight[]>(this.sightApi);
  }

  
}
