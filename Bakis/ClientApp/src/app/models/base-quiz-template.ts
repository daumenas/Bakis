import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { BaseQuizQuestion } from './base-quiz-question';
import { BaseSight } from './base-sight';

export abstract class BaseQuizTemplate {
  id: number;
  name: string;
  title: string;
  questions: BaseQuizQuestion[];
  sightId: number;
  sightName: string;
}
