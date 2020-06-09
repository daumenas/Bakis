import { Component } from '@angular/core';
import { Time } from '@angular/common';

export abstract class BasePrize {
  name: string;
  description: string;
  picture: string;
  points: number;
  available: boolean;
}
