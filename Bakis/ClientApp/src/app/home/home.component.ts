import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  points: number;


  constructor(private userService: UserService,
    private authService: AuthenticationService) { }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.userService.getUser().subscribe(data => {
        this.points = data.points
      });
    }
  }

  loggedIn() {
    return this.authService.isAuthenticated()
  }
}
