import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { BaseUser } from '../../models/base-user';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-picture-game',
  templateUrl: './picture-game.component.html',
  styleUrls: ['./picture-game.component.css']
})
export class PictureGameComponent implements OnInit {

  pictureForm: FormGroup;
  url: string | ArrayBuffer;
  user: BaseUser;
  private thisUserId: number;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<PictureGameComponent>) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      if (confirm(this.translate.instant('snackbar.youSure'))) {
        this.dialogRef.close();
      }
    });
    this.pictureForm = this.formBuilder.group({
      picture: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): any {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    this.dialogRef.close(true);
  };

  onSelectFile(event) { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 

      reader.onload = (event) => { 
        this.url = event.target.result;
      }
    }
  }
}
