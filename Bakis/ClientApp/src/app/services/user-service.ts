import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NewUser } from "../models/new-user";
import { Observable } from "rxjs";
import { BaseUser } from "../models/base-user";
@Injectable({ providedIn: 'root' })

export class UserService {
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly userApi = `${this.baseUrl}api/Consumers`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerUser(user: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(this.userApi, user);
  }

  
}