import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../app/services/user-service';
import { NewUser } from '../../models/new-user';
import { Role } from 'src/app/models/role';
import { AuthenticationService } from '../../services/authentication.service';


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

  @Input() roles: Role[]

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      passwordl: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]],
      role: [],
    });
  }

  getAllRoles() {
    this.authenticationService.getRoles().subscribe(roles => {
      this.roles = roles;
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
