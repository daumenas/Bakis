import { Component } from '@angular/core';

export abstract class BaseUser {
  name: string;
  surname: string;
  date: Date;
  email: string;
  role: string;
  points: number;
}

