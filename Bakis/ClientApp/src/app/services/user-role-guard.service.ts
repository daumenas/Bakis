import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuardService implements CanActivate {

  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      const user = this._authService.decode();
      if (user.role === "User" || user.role === "Event Organizer" || user.role === "Admin") {
        return true;
      }
    }
    this._router.navigate(['/']);
    return false;
  }

}
