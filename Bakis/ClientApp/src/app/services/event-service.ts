//import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { Inject, Injectable } from "@angular/core";
//import { Observable } from "rxjs";
//import { BaseEvent } from "../models/base-event";
//import { TableRowEvent } from "../models/table-row-event"
//@Injectable({ providedIn: 'root' })

//export class EventService {
//  private readonly headers = {
//    headers: new HttpHeaders({
//      'Content-Type': 'application/json'
//    })
//  }

//  private readonly eventApi = `${this.baseUrl}api/Events`;

//  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

//  registerEvent(event: BaseEvent): Observable<BaseEvent> {
//    return this.http.post<BaseEvent>(this.eventApi, event);
//  }

//  getAllEvents(): Observable<TableRowEvent[]> {
//    return this.http.get<TableRowEvent[]>(this.eventApi);
//  }

//  editEvent(event: BaseEvent, id: number) {
//    return this.http.put(`${this.eventApi}/${id}`, event);
//  }

//  deleteEvent(id: number) {
//    return this.http.delete(`${this.eventApi}/${id}`);
//  }

  
//}
