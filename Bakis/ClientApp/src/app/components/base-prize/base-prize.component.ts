import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '../../home/home.component';
import { PrizeService } from '../../services/prize.service';
import { BasePrize } from '../../models/base-prize';
import { SendReceiveService } from '../../services/send-receive.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base-prize',
  templateUrl: './base-prize.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})
export class BasePrizeComponent implements OnInit {
  basePrizeForm: FormGroup;
  buttonText: string;
  titleText: string;
  dialogRef: any;
  url: string;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private prizeService: PrizeService,
    private formBuilder: FormBuilder,
    private sendReceiveService: SendReceiveService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.buttonText = this.translate.instant('modal.addPrize');
    this.titleText = this.translate.instant('modal.newPrize');
    if (this.data.isEdit == undefined) {
      this.basePrizeForm = this.formBuilder.group({
        name: ['', [
          Validators.required
        ]],
        description: ['', [
          Validators.required
        ]],
        picture: ['', [
          Validators.required
        ]],
        points: ['', [
          Validators.required
        ]]
      });
    }
    else {
      this.url = this.data.prizeToUpdate.picture;
      this.titleText = this.translate.instant('modal.editPrize');
      this.buttonText = this.translate.instant('modal.editPrize');
      this.basePrizeForm = this.formBuilder.group({
        name: [this.data.prizeToUpdate.name, [
          Validators.required
        ]],
        description: [this.data.prizeToUpdate.description, [
          Validators.required
        ]],
        picture: ['', [
        ]],
        points: [this.data.prizeToUpdate.points, [
          Validators.required
        ]]
      });
    }
  }

  getFormPrizeData(): BasePrize {
    const formUserData = Object.assign(this.basePrizeForm.value);
    return formUserData;
  }

  addNewPrize(newPrize: BasePrize) {
    this.prizeService.registerPrize(newPrize).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  editPrize(editPrize: BasePrize) {
    this.prizeService.editPrize(editPrize, this.data.prizeToUpdate.id).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  openMapModal(): void {
    this.dialogRef = this.dialog.open(HomeComponent, {
      width: '550px'
    });
  }

  onSubmit() {
    if (this.data.isEdit == undefined) {
      const prize = this.getFormPrizeData();
      prize.picture = this.url.toString();
      this.addNewPrize(prize);
      if (this.basePrizeForm.valid) {
        console.log("Form Submitted!");
      }
      this.prizeService.registerPrize(prize);
    }
    else {
      const prize = this.getFormPrizeData();
      prize.picture = this.url;
      this.editPrize(prize);
      if (this.basePrizeForm.valid) {
        console.log("Form Submitted!");
      }
      this.prizeService.editPrize(prize, this.data.prizeToUpdate.id);

    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        if (event.total <= 5000000) {
          this.url = event.target.result.toString();
        } else {
          this.basePrizeForm.get('picture').setValue(null);
          this.snackbar.open(this.translate.instant('snackbar.tooBig'), null, {
            duration: 1500
          });
        }
      }
    }
  }

  writeValue(value: any) {
    if (value) {
      this.basePrizeForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.basePrizeForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
