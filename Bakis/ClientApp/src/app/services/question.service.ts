import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseSight } from "../models/base-sight";
import { TableRowSight } from "../models/table-row-sight"
import { NewQuizQuestion } from "../models/new-quiz-question";
import { BaseQuizQuestion } from "../models/base-quiz-question";

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly questionApi = `${this.baseUrl}api/Questions`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerQuestion(question: NewQuizQuestion): Observable<NewQuizQuestion> {
    return this.http.post<NewQuizQuestion>(this.questionApi, question);
  }

  getAllQuestions(): Observable<BaseQuizQuestion[]> {
    return this.http.get<BaseQuizQuestion[]>(this.questionApi);
  }

  editQuestion(question: NewQuizQuestion, id: number) {
    return this.http.put(`${this.questionApi}/${id}`, question);
  }

  deleteQuestion(id: number) {
    return this.http.delete(`${this.questionApi}/${id}`);
  }


}
