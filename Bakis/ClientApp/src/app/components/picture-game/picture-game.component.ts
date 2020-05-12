import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { BaseUser } from '../../models/base-user';

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
    private userService: UserService) { }

  ngOnInit(): void {
    this.pictureForm = this.formBuilder.group({
      picture: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): any {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.user.points = user.points + 10;
      this.userService.editUser(this.user, this.thisUserId).subscribe();
    })
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
