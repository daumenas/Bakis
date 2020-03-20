import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//import { AuthenticationService } from '../../../app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder) //private authenticationService: AuthenticationService)
  {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required
      ]],
    });

  }
  //get f() { return this.loginForm.controls; }

  onSubmit() {
    //this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
    //  .subscribe(
    //    data => {
    //    },
    //    error => {
    //      this.loading = false;
    //    });
  }

}
