import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EventService } from '../../../app/services/event-service';
import { BaseEvent } from '../../models/base-event';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent implements OnInit, ControlValueAccessor {
  addEventForm: FormGroup;
  minDate: Date;



  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear);
  }

  ngOnInit() {
    this.addEventForm = this.formBuilder.group({
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

  getFormEventData(): BaseEvent {
    const formUserData = Object.assign(this.addEventForm.value);
    return formUserData;
  }

  addNewUser(newEvent: BaseEvent) {
    this.eventService.registerEvent(newEvent).subscribe(() => {

    });
  }

  onSubmit() {
    const event = this.getFormEventData();
    this.addNewUser(event);
    if (this.addEventForm.valid) {
      console.log("Form Submitted!");
    }
    this.eventService.registerEvent(event);
  }

  writeValue(value: any) {
    if (value) {
      this.addEventForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.addEventForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
