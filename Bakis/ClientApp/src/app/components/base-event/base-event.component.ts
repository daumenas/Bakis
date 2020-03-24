import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { CityEventService } from '../../../app/services/city-event.service';
import { BaseEvent } from '../../models/base-event';


@Component({
  selector: 'base-add-event',
  templateUrl: './base-event.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class BaseEventComponent implements OnInit, ControlValueAccessor {
  baseEventForm: FormGroup;
  minDate: Date;
  buttonText: string;




  constructor(private eventService: CityEventService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear);
  }

  ngOnInit() {
    this.buttonText = "Add Event"
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
        fromDate: ['', [
          Validators.required
        ]],
        toDate: ['', [
          Validators.required
        ]],
        time: ['', [
          Validators.required
        ]]
      });
    }
    else {
      this.buttonText = "Edit Event"
        this.baseEventForm = this.formBuilder.group({
        name: [this.data.name, [
          Validators.required
        ]],
        description: [this.data.description, [
          Validators.required
        ]],
        points: [this.data.points, [
          Validators.required
        ]],
        address: [this.data.address, [
          Validators.required
        ]],
        latitude: [this.data.latitude, [
          Validators.required
        ]],
        longitude: [this.data.longitude, [
          Validators.required
        ]],
        fromDate: [this.data.fromDate, [
          Validators.required
        ]],
        toDate: [this.data.toDate, [
          Validators.required
        ]],
        time: [this.data.time, [
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
    if (this.data.isEdit == undefined) {
      const event = this.getFormEventData();
      this.addNewEvent(event);
      if (this.baseEventForm.valid) {
        console.log("Form Submitted!");
      }
      this.eventService.registerEvent(event);
    }
    else {
      const event = this.getFormEventData();
      this.editEvent(event);
      if (this.baseEventForm.valid) {
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
