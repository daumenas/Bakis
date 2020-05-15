import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { BaseQuizQuestionChoice } from './base-quiz-question-choice';

export abstract class BaseQuizQuestion {
  id: number;
  name: string;
  type: string;
  title: string;
  correctAnswer: number;
  points: number;
  questionChoices: BaseQuizQuestionChoice[];
}
