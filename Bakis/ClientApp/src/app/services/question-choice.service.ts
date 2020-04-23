import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseSight } from "../models/base-sight";
import { TableRowSight } from "../models/table-row-sight"
import { NewQuizQuestion } from "../models/new-quiz-question";
import { BaseQuizQuestionChoice } from "../models/base-quiz-question-choice";
import { NewQuizQuestionChoice } from "../models/new-quiz-question-choice";

@Injectable({
  providedIn: 'root'
})

export class QuestionChoiceService {
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly questionChoiceApi = `${this.baseUrl}api/QuestionChoices`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerQuestionChoice(quizQuestionChoice: NewQuizQuestionChoice): Observable<NewQuizQuestionChoice> {
    return this.http.post<NewQuizQuestionChoice>(this.questionChoiceApi, quizQuestionChoice);
  }

  getAllQuestionChoices(): Observable<BaseQuizQuestionChoice[]> {
    return this.http.get<BaseQuizQuestionChoice[]>(this.questionChoiceApi);
  }

  editQuestionChoice(questionChoice: NewQuizQuestionChoice, id: number) {
    return this.http.put(`${this.questionChoiceApi}/${id}`, questionChoice);
  }

  deleteQuestionChoice(id: number) {
    return this.http.delete(`${this.questionChoiceApi}/${id}`);
  }


}
