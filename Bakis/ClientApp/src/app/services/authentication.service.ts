import { Injectable, Inject, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role';

export class AuthenticationService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService,
    @Inject('BASE_URL') private baseUrl: string) {

  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}api/Auth/roles`);
  }
}
