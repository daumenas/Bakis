import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { BaseSight } from '../../models/base-sight';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SendReceiveService } from '../../services/send-receive.service';
import { HomeComponent } from '../../home/home.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-base-sight',
  templateUrl: './base-sight.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class BaseSightComponent implements OnInit, ControlValueAccessor {
  baseSightForm: FormGroup;
  buttonText: string;
  titleText: string;
  dialogRef: any;

  constructor(
    private latlngService: SendReceiveService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private sightService: LocationService,
    private formBuilder: FormBuilder,
    private sendReceiveService: SendReceiveService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.latlngService.latLngReceive$.subscribe((data) => {
      this.dialogRef.close();
      this.baseSightForm.get('latitude').setValue(data.lat);
      this.baseSightForm.get('longitude').setValue(data.lng);
    });
  }

  ngOnInit() {
    this.buttonText = this.translate.instant('modal.addSight');
    this.titleText = this.translate.instant('modal.newSight');
    if (this.data.isEdit == undefined) {
      this.baseSightForm = this.formBuilder.group({
        name: ['', [
          Validators.required
        ]],
        description: ['', [
          Validators.required
        ]],
        points: ['', [
          Validators.required
        ]],
        address: ['', [
        ]],
        latitude: ['', [
          Validators.required
        ]],
        longitude: ['', [
          Validators.required
        ]]
      });
    }
    else {
      this.titleText = this.translate.instant('modal.editSight');
      this.buttonText = this.translate.instant('modal.editSight');
      this.baseSightForm = this.formBuilder.group({
        name: [this.data.sightToUpdate.name, [
          Validators.required
        ]],
        description: [this.data.sightToUpdate.description, [
          Validators.required
        ]],
        points: [this.data.sightToUpdate.points, [
          Validators.required
        ]],
        address: [this.data.sightToUpdate.address, [
        ]],
        latitude: [this.data.sightToUpdate.latitude, [
          Validators.required
        ]],
        longitude: [this.data.sightToUpdate.longitude, [
          Validators.required
        ]]
      });
    }
  }

  getFormSightData(): BaseSight {
    const formUserData = Object.assign(this.baseSightForm.value);
    return formUserData;
  }

  addNewSight(newSight: BaseSight) {
    this.sightService.registerSight(newSight).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  editSight(editSight: BaseSight) {
    this.sightService.editSight(editSight, this.data.sightToUpdate.id).subscribe(() => {
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
      const sight = this.getFormSightData();
      sight.checkedIn = 0;
      this.addNewSight(sight);
      if (this.baseSightForm.valid) {
        console.log("Form Submitted!");
      }
      this.sightService.registerSight(sight);
    }
    else {
      const sight = this.getFormSightData();
      sight.checkedIn = this.data.sightToUpdate.checkedIn;
      this.editSight(sight);
      if (this.baseSightForm.valid) {
        console.log("Form Submitted!");
      }
      this.sightService.editSight(sight, this.data.sightToUpdate.id);
      
    }
  }

  writeValue(value: any) {
    if (value) {
      this.baseSightForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.baseSightForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
