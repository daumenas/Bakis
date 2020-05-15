import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseEvent } from "../models/base-event";
import { TableRowEvent } from "../models/table-row-event"
import { UserEvent } from "../models/user-event";
@Injectable({ providedIn: 'root' })

@Injectable({
  providedIn: 'root'
})
export class CityEventService {
  private thisUserId: number;

  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly eventApi = `${this.baseUrl}api/CityEvents`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerEvent(event: BaseEvent): Observable<BaseEvent> {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    event.createdBy = this.thisUserId;
    return this.http.post<BaseEvent>(this.eventApi, event);
  }

  getAllEvents(): Observable<TableRowEvent[]> {
    return this.http.get<TableRowEvent[]>(this.eventApi);
  }

  getAllEventsForMap(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(this.eventApi);
  }

  editEvent(event: BaseEvent, id: number) {
    return this.http.put(`${this.eventApi}/${id}`, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.eventApi}/${id}`);
  }

  getAllEventsByUserId(): Observable<UserEvent[]> {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get<UserEvent[]>(`${this.eventApi}/byuser/${this.thisUserId}`);
  }

}
