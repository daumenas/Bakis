import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseSight } from "../models/base-sight";
import { TableRowSight } from "../models/table-row-sight"
import { UserSight } from "../models/user-sight";

@Injectable({
  providedIn: 'root'
})


export class LocationService {
  private thisUserId: number;
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly sightApi = `${this.baseUrl}api/Sights`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerSight(sight: BaseSight): Observable<BaseSight> {
    return this.http.post<BaseSight>(this.sightApi, sight);
  }

  getAllSights(): Observable<TableRowSight[]> {
    return this.http.get<TableRowSight[]>(this.sightApi);
  }

  getAllSightsForMap(): Observable<UserSight[]> {
    return this.http.get<UserSight[]>(this.sightApi);
  }

  editSight(sight: BaseSight, id: number) {
    return this.http.put(`${this.sightApi}/${id}`, sight);
  }

  deleteSight(id: number) {
    return this.http.delete(`${this.sightApi}/${id}`);
  }

  getAllSightsByUserId(): Observable<UserSight[]> {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get<UserSight[]>(`${this.sightApi}/byuser/${this.thisUserId}`);
  }

}
