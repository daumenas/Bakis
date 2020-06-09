import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEmail } from '../../models/confirm-email';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmEmail: ConfirmEmail = new ConfirmEmail();

  constructor(private userService: UserService, private activateRouted: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activateRouted.queryParamMap.subscribe(params => {
      var email = params.get("userEmail");
      var token = params.get("token");

      this.confirmEmail.email = email;
      this.confirmEmail.token = token;

      this.userService.confirmEmail(this.confirmEmail).subscribe(params => { });
    });
  }
}
