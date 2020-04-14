import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';
import { BaseEventComponent } from '../components/base-event/base-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private auth: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  check() {
    return this.auth.isAuthenticated();
  }

  checkIfAdmin() {
    if (this.check()) {
      const user = this.auth.decode();
      if (user.role === "Admin") {
        return true;
      }
      return false;
    }
    return false;
  }

  checkIfEvent() {
    if (this.check()) {
      const user = this.auth.decode();
      if (user.role === "Event Organizer") {
        return true;
      }
      return false;
    }
    return false;
  }

  openSubmitModal(): void {
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        submitEvent: "Submit Event"
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
