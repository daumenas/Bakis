import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { SendReceiveService } from '../services/send-receive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  points: number;


  constructor(private userService: UserService,
    private authService: AuthenticationService,
    private sendReceiveService: SendReceiveService) { }


  ngOnInit() {
    this.loadPoints();
    this.sendReceiveService.pointsReceive$.subscribe((data) => {
      this.loadPoints();
    });
  }

  loggedIn() {
    return this.authService.isAuthenticated()
  }

  loadPoints() {
    if (this.authService.isAuthenticated()) {
      this.userService.getUser().subscribe(data => {
        this.points = data.points
      });
    }
  }
}
