import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TableRowPrize } from "../models/table-row-prize";
import { BasePrize } from "../models/base-prize";
import { UserPrize } from "../models/user-prizes";
import { TableRowConsumerPrize } from "../models/table-row-consumerprize";


@Injectable({
  providedIn: 'root'
})

export class PrizeService {
  private thisUserId: number;
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private readonly prizeApi = `${this.baseUrl}api/Prizes`;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerPrize(prize: BasePrize): Observable<BasePrize> {
    return this.http.post<BasePrize>(this.prizeApi, prize);
  }

  getAllPrizes(): Observable<TableRowPrize[]> {
    return this.http.get<TableRowPrize[]>(this.prizeApi);
  }

  editPrize(prize: BasePrize, id: number) {
    return this.http.put(`${this.prizeApi}/${id}`, prize);
  }

  deletePrize(id: number) {
    return this.http.delete(`${this.prizeApi}/${id}`);
  }

  getAllPrizesByUserId(): Observable<UserPrize[]> {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    return this.http.get<UserPrize[]>(`${this.prizeApi}/byuser/${this.thisUserId}`);
  }

  getAllConsumerPrizes(): Observable<TableRowConsumerPrize[]> {
    return this.http.get<TableRowConsumerPrize[]>(`${this.prizeApi}/ConsumerPrizes`);
  }

  removeUserPrize(userId: number, prizeId: number): Observable<TableRowConsumerPrize[]> {
    return this.http.delete<TableRowConsumerPrize[]>(`${this.prizeApi}/remove/${userId}/${prizeId}`);
  }
}
