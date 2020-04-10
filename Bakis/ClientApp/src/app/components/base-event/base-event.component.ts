import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { CityEventService } from '../../../app/services/city-event.service';
import { BaseEvent } from '../../models/base-event';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

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

  constructor(
    public snackbar: MatSnackBar,
    private eventService: CityEventService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.buttonText = "Add Event";
    this.titleText = "New Event";
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
        ]]
      });
    }
    else {
      this.buttonText = "Edit Event";
      this.titleText = "Edit Event";
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
          time: [formatDate(this.data.eventToUpdate.time, "HH:mm", "en", "+0400"), [
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

    });
  }

  editEvent(editEvent: BaseEvent) {
    this.eventService.editEvent(editEvent, this.data.eventToUpdate.id).subscribe(() => {
    });
  }

  onSubmit() {
    this.baseEventForm.get('time').setValue(new Date("2000-01-01T" + this.baseEventForm.get('time').value + ":00"));
    this.baseEventForm.get('dateFrom').setValue(formatDate(this.baseEventForm.get('dateFrom').value, "yyyy-MM-dd", "en"));
    this.baseEventForm.get('dateTo').setValue(formatDate(this.baseEventForm.get('dateTo').value, "yyyy-MM-dd", "en"));
    if (this.data.isEdit == undefined) {
      const event = this.getFormEventData();
      this.addNewEvent(event);
      if (this.baseEventForm.valid) {
        this.snackbar.open("Event added", null, {
          duration: 1500
        });
        console.log("Form Submitted!");
      }
      this.eventService.registerEvent(event);
    }
    else {
      const event = this.getFormEventData();
      this.editEvent(event);
      if (this.baseEventForm.valid) {
        this.snackbar.open("Event edited", null, {
          duration: 1500
        });
        console.log("Form Submitted!");
      }
      this.eventService.editEvent(event, this.data.eventToUpdate.id);
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
