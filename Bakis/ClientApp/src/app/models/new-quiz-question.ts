import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { BaseQuizQuestionChoice } from './base-quiz-question-choice';

export abstract class NewQuizQuestion {
  name: string;
  type: string;
  title: string;
  correctAnswer: number;
  questionChoices: BaseQuizQuestionChoice[];
}
