import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NewUser } from "../models/new-user";
import { Observable } from "rxjs";
import { BaseUser } from "../models/base-user";
import { TableRowUser } from "../models/table-row-user"
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

  getAllUsers(): Observable<TableRowUser[]> {
    return this.http.get<TableRowUser[]>(this.userApi);
  }

  editUser(user: BaseUser, id: number) {
    return this.http.put(`${this.userApi}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userApi}/${id}`);
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.userApi}/${email}/exists`);
  }
}
