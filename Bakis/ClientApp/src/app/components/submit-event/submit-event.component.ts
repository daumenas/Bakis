import { Component, OnInit } from '@angular/core';
import { BaseEventComponent } from '../base-event/base-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-event',
  templateUrl: './submit-event.component.html',
  styleUrls: ['./submit-event.component.css']
})
export class SubmitEventComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSubmitModal(): void {
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        submitEvent: "Submit Event"
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
