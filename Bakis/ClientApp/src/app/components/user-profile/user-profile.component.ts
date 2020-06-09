import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../app/services/user.service';
import { BaseUser } from '../../models/base-user';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OldNewPassword } from '../../models/old-new-password';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  editUserForm: FormGroup;
  editUserPasswordForm: FormGroup;
  minDate: Date;
  roles: string[] = ['User', 'Event Organizer'];
  private thisUserId: number;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]],
      birthdayDate: ['', [
        Validators.required
      ]]
    });
    this.editUserPasswordForm = this.formBuilder.group({
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
    this.userService.getUser().subscribe(data => {
      this.editUserForm.get('email').setValue(data.email);
      this.editUserForm.get('name').setValue(data.name);
      this.editUserForm.get('surname').setValue(data.surname);
      this.editUserForm.get('birthdayDate').setValue(data.birthdayDate);
    })
  }

  getFormUserData(): BaseUser {
    const formUserData = Object.assign(this.editUserForm.value);
    return formUserData;
  }

  getFormUserPasswordData(): OldNewPassword {
    const formUserData = Object.assign(this.editUserPasswordForm.value);
    return formUserData;
  }

  editUser(editUser: BaseUser) {
    this.userService.editProfile(editUser).subscribe(() => {
      this.snackbar.open("✓", null, {
        duration: 1500
      });
    });
  }

  onSubmit() {
    this.editUserForm.get('birthdayDate').setValue(formatDate(this.editUserForm.get('birthdayDate').value, "yyyy-MM-dd", "en"));
    const user = this.getFormUserData();
    this.editUser(user);
    this.userService.editProfile(user);
  }

  onSubmitPassword() {
    const password = this.getFormUserPasswordData();
    this.userService.changePassword(password).subscribe(() => {
      this.snackbar.open("✓", null, {
        duration: 1500
      });
    },
      error => {
        this.snackbar.open("✗", null, {
          duration: 1500
        });
      });
  }
}
