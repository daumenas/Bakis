import { Component } from '@angular/core';
import { TableRowEvent } from './table-row-event';


export class UserEvent extends TableRowEvent {
  isCheckedIn: boolean;
}
