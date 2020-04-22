import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../app/services/user.service';
import { BaseUser } from '../../models/base-user';


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class UserEditDialogComponent implements OnInit {
  editUserForm: FormGroup;
  minDate: Date;
  roles: string[] = ['User', 'Event Organizer'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      email: [this.data.userToUpdate.email, [
        Validators.required,
        Validators.email,
      ]],
      name: [this.data.userToUpdate.name, [
        Validators.required
      ]],
      surname: [this.data.userToUpdate.surname, [
        Validators.required
      ]],
      birthday: [this.data.userToUpdate.birthdayDate, [
        Validators.required
      ]],
      points: [this.data.userToUpdate.points, [
        Validators.required
      ]],
      role: [this.data.userToUpdate.role, [
      ]],
    });
  }

  getFormUserData(): BaseUser {
    const formUserData = Object.assign(this.editUserForm.value);
    return formUserData;
  }

  editUser(editUser: BaseUser) {
    this.userService.editUser(editUser, this.data.userToUpdate.id).subscribe(() => {
    });
  }

  onSubmit() {
    const user = this.getFormUserData();
    this.editUser(user);
    if (this.editUserForm.valid) {
      console.log("Form Submitted!");
    }
    this.userService.editUser(user, this.data.userToUpdate.id);
  }

}
