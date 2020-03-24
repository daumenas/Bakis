import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { UserService } from '../../../app/services/user.service';
import { NewUser } from '../../models/new-user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../log-in-register-style/log-in-register.component.css']
})

export class RegisterComponent implements OnInit, ControlValueAccessor {
  registerUserForm: FormGroup; 
  minDate: Date;
  Roles: any = ['User', 'Event Organizer'];

  constructor(
    private router: Router,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
  }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]],
      birthday: ['', [
        Validators.required
      ]],
      role: [],
    });
  }

  getFormUserData(): NewUser {
    const formUserData = Object.assign(this.registerUserForm.value);
    return formUserData;
  }

  addNewUser(newUser: NewUser) {
    this.userService.registerUser(newUser).subscribe(() => {

    });
  }

  //////////////////////////////////////////////////////////////////////////
  checkEmail(email: string) {
    this.userService.emailExists(email).subscribe(data => console.log(data));
    return true;
  }
  //////////////////////////////////////////////////////////////////////////

  onSubmit() {
    this.registerUserForm.get('email').setErrors({ 'exists': null });
    this.registerUserForm.get('email').updateValueAndValidity();
    const user = this.getFormUserData();
    console.log(this.checkEmail(this.registerUserForm.get('email').value));
    if (this.checkEmail(this.registerUserForm.get('email').value)) {
      this.addNewUser(user);
      if (this.registerUserForm.valid) {
        this.snackbar.open("Registration Succesful", null, {
          duration: 1500
        });
        this.router.navigate(['/'])
      }
      this.userService.registerUser(user);
    } else {
      this.registerUserForm.get('email').setErrors({ 'exists': true });
    }
  }

  writeValue(value: any) {
    if (value) {
      this.registerUserForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.registerUserForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  getErrorMessage() {
    return this.registerUserForm.controls['email'].hasError('email') ? 'You must enter a valid email' :
      this.registerUserForm.controls['email'].hasError('exists') ? 'Email is aldready taken' : '';
  }

}
