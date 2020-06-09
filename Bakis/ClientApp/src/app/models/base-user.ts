import { Component } from '@angular/core';

export abstract class BaseUser {
  name: string;
  surname: string;
  birthdayDate: Date;
  email: string;
  role: string;
  points: number;
}

