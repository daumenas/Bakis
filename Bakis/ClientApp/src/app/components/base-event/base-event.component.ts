import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { CityEventService } from '../../../app/services/city-event.service';
import { BaseEvent } from '../../models/base-event';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { HomeComponent } from '../../home/home.component';
import { SendReceiveService } from '../../services/send-receive.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-base-event',
  templateUrl: './base-event.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class BaseEventComponent implements OnInit, ControlValueAccessor {

  baseEventForm: FormGroup;
  minDate: Date;
  buttonText: string;
  titleText: string;
  dialogRef: any;
  snackbarText: string

  constructor(
    private translate: TranslateService,
    private latlngService: SendReceiveService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private eventService: CityEventService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private sendReceiveService: SendReceiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.latlngService.latLngReceive$.subscribe((data) => {
      this.dialogRef.close();
      this.baseEventForm.get('latitude').setValue(data.lat);
      this.baseEventForm.get('longitude').setValue(data.lng);
    });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 365);
  }

  ngOnInit() {
    this.snackbarText = this.translate.instant('snackbar.eventAdded');
    if (this.data.submitEvent == undefined) {
      this.buttonText = this.translate.instant('modal.addEvent');
      this.titleText = this.translate.instant('modal.newEvent'); 
    } else {
      this.buttonText = this.data.submitEvent;
      this.titleText = this.data.submitEvent;
      this.snackbarText = this.translate.instant('modal.eventSubmit'); 
    }
    if (this.data.isEdit == undefined) {
      this.baseEventForm = this.formBuilder.group({
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
          Validators.required
        ]],
        latitude: ['', [
          Validators.required
        ]],
        longitude: ['', [
          Validators.required
        ]],
        dateFrom: ['', [
          Validators.required
        ]],
        dateTo: ['', [
          Validators.required
        ]],
        time: ['', [
          Validators.required
        ]],
        endTime: ['', [
          Validators.required
        ]],
        amount: ['', [
          Validators.required
        ]]
      });
    }
    else {
      this.buttonText = this.data.saveEditText;
      this.titleText = this.translate.instant('modal.editEvent'); 
      this.baseEventForm = this.formBuilder.group({
        name: [this.data.eventToUpdate.name, [
          Validators.required
        ]],
        description: [this.data.eventToUpdate.description, [
          Validators.required
        ]],
        points: [this.data.eventToUpdate.points, [
          Validators.required
        ]],
        address: [this.data.eventToUpdate.address, [
          Validators.required
        ]],
        latitude: [this.data.eventToUpdate.latitude, [
          Validators.required
        ]],
        longitude: [this.data.eventToUpdate.longitude, [
          Validators.required
        ]],
        dateFrom: [formatDate(this.data.eventToUpdate.dateFrom, "yyyy-MM-dd", "en", "+0400"), [
          Validators.required
        ]],
        dateTo: [formatDate(this.data.eventToUpdate.dateTo, "yyyy-MM-dd", "en", "+0400"), [
          Validators.required
        ]],
        time: [formatDate(this.data.eventToUpdate.time, "HH:mm", "en", "+0300"), [
          Validators.required
        ]],
        endTime: [formatDate(this.data.eventToUpdate.endTime, "HH:mm", "en", "+0300"), [
          Validators.required
        ]],
        amount: [this.data.eventToUpdate.amount, [
          Validators.required
        ]]
      });
    }
  }

  getFormEventData(): BaseEvent {
    const formUserData = Object.assign(this.baseEventForm.value);
    return formUserData;
  }

  addNewEvent(newEvent: BaseEvent) {
    this.eventService.registerEvent(newEvent).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  editEvent(editEvent: BaseEvent) {
    editEvent.checkedIn = this.data.eventToUpdate.checkedIn;
    editEvent.createdBy = this.data.eventToUpdate.createdBy;
    this.eventService.editEvent(editEvent, this.data.eventToUpdate.id).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  openMapModal(): void {
    this.dialogRef = this.dialog.open(HomeComponent, {
      width: '550px'
    });
  }

  onSubmit() {
    this.baseEventForm.get('dateFrom').setValue(formatDate(this.baseEventForm.get('dateFrom').value, "yyyy-MM-dd", "en"));
    this.baseEventForm.get('dateTo').setValue(formatDate(this.baseEventForm.get('dateTo').value, "yyyy-MM-dd", "en"));
    if (this.data.isEdit == undefined) {
      const event = this.getFormEventData();
      if (this.authenticationService.isAuthenticated()) {
        if (this.authenticationService.isAdmin()) {
          event['approval'] = true;
        } else {
          event['approval'] = false;
        }
      }

      this.addNewEvent(event);
      if (this.baseEventForm.valid) {
        this.snackbar.open(this.snackbarText, null, {
          duration: 1500
        });
      }
      this.eventService.registerEvent(event);
    }
    else {
      const event = this.getFormEventData();     
      if (this.baseEventForm.valid) {
        this.snackbar.open(this.translate.instant('snackbar.eventEdited'), null, {
          duration: 1500
        });
      }
      event.approval = true;
      this.editEvent(event);
    }
  }

  writeValue(value: any) {
    if (value) {
      this.baseEventForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.baseEventForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
