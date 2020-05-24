import { Component } from '@angular/core';
import { BaseEvent } from './base-event';
import { TableRowEvent } from './table-row-event';
import { EventListUser } from './event-list-user';


export class EventList extends TableRowEvent {
  userEvent: EventListUser[]
}
