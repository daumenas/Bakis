import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BaseEvent } from "../models/base-event";
import { TableRowEvent } from "../models/table-row-event"

@Injectable({
  providedIn: 'root'
})
export class SendReceiveService {
  latLngReceive$: Observable<any>;
  sightReceive$: Observable<any>;
  private subjectLatLng = new Subject<any>();
  private subjectSight = new Subject<any>();

  constructor() {
    this.latLngReceive$ = this.subjectLatLng.asObservable();
    this.sightReceive$ = this.subjectSight.asObservable();
  }

  latLngSender(data) {
    this.subjectLatLng.next(data);
  }

  sightSender(data) {
    this.subjectSight.next(data);
  }
}