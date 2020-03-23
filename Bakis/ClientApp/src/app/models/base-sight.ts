import { Component } from '@angular/core';
import { Time } from '@angular/common';

export abstract class BaseSight {
  name: string;
  description: string;
  points: number;
  address: string
  latitude: string;
  longitude: string;
  fromDate: Date;
  toDate: Date;
  time: Time;
}

