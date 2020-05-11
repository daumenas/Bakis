import { Component } from '@angular/core';
import { Time } from '@angular/common';

export abstract class BaseEvent {
  name: string;
  description: string;
  points: number;
  address: string
  latitude: number;
  longitude: number;
  dateFrom: Date;
  dateTo: Date;
  time: Date;
  endTime: Date;
  amount: number;
  checkedIn: number;
  approval: boolean;
}
