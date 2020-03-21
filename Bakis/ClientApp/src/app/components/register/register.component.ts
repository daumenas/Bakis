import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../app/services/user-service';
import { NewUser } from '../../models/new-user';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, ControlValueAccessor {
  registerUserForm: FormGroup; 
  minDate: Date;

  matcher = new MyErrorStateMatcher();

  Roles: any = ['User', 'Event Organizer'];

  constructor(
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
        Validators.required
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

  onSubmit() {
    const user = this.getFormUserData();
    this.addNewUser(user);
    if (this.registerUserForm.valid) {
      console.log("Form Submitted!");
    }
    this.userService.registerUser(user);
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

}
