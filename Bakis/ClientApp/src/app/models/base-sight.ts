import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { BaseQuizTemplate } from './base-quiz-template';

export abstract class BaseSight {
  name: string;
  description: string;
  points: number;
  address: string
  latitude: number;
  longitude: number;
  quizTemplate: BaseQuizTemplate;
}

