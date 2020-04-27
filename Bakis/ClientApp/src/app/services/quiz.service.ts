import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewQuizTemplate } from "../models/new-quiz-template";
import { BaseQuizTemplate } from "../models/base-quiz-template";

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly quizApi = `${this.baseUrl}api/QuizTemplates`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerQuizTemplate(quizTemplate: NewQuizTemplate): Observable<NewQuizTemplate> {
    return this.http.post<NewQuizTemplate>(this.quizApi, quizTemplate);
  }

  getAllQuizTemplates(): Observable<BaseQuizTemplate[]> {
    return this.http.get<BaseQuizTemplate[]>(this.quizApi);
  }

  editQuizTemplates(quizTemplate: NewQuizTemplate, id: number) {
    return this.http.put(`${this.quizApi}/${id}`, quizTemplate);
  }

  deleteQuizTemplate(id: number) {
    return this.http.delete(`${this.quizApi}/${id}`);
  }
}
