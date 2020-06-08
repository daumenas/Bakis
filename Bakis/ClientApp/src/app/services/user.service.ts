import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NewUser } from "../models/new-user";
import { Observable } from "rxjs";
import { BaseUser } from "../models/base-user";
import { TableRowUser } from "../models/table-row-user"
@Injectable({ providedIn: 'root' })

export class UserService {
  private thisUserId: number;

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

  getUser(): Observable<BaseUser> {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get<BaseUser>(`${this.userApi}/${this.thisUserId}`);
  }

  getUserById(id: number): Observable<BaseUser> {
    return this.http.get<BaseUser>(`${this.userApi}/${id}`);
  }

  editUser(user: BaseUser, id: number) {
    return this.http.put(`${this.userApi}/${id}`, user);
  }

  editProfile(user: BaseUser) {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    return this.http.put(`${this.userApi}/${this.thisUserId}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userApi}/${id}`);
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.userApi}/${email}/exists`);
  }

  buyPrize(prizeId: number) {
    return this.http.get<boolean>(`${this.userApi}/buyPrize/${this.thisUserId}/${prizeId}`);
  }

  sightCheckIn(sightId: any, isGamePlayed: boolean, points: number) {
    return this.http.get<boolean>(`${this.userApi}/${this.thisUserId}/${sightId}/${isGamePlayed}/${points}`);
  }

  eventCheckIn(eventId: any) {
    return this.http.get<boolean>(`${this.userApi}/${this.thisUserId}/${eventId}`);
  }
}
