import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { BaseQuizQuestion } from './base-quiz-question';

export abstract class BaseQuizTemplate {
  id: number;
  name: string;
  title: string;
  questions: BaseQuizQuestion[];
}