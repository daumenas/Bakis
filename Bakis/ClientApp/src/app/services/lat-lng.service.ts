import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BaseEvent } from "../models/base-event";
import { TableRowEvent } from "../models/table-row-event"

@Injectable({
  providedIn: 'root'
})
export class LatLngService {
  latLngReceive$: Observable<any>;
  private subject = new Subject<any>();

  constructor() {
    this.latLngReceive$ = this.subject.asObservable();
  }

  latLngSender(data) {
    this.subject.next(data);
  }
}
