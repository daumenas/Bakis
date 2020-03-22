import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseEvent } from '../../models/base-event';
import { EventService } from '../../services/event-service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowEvent } from "../../models/table-row-event";
import { BaseEventComponent } from '../base-event/base-event.component';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  events: TableRowEvent[];
  eventToUpdate: TableRowEvent;

  ocassions: BaseEvent[] = [];

  listOfData: TableRowEvent[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'points',
    'address', 'latitude', 'longtitude', 'fromDate', 'toDate', 'actions'];

  eventDataSource = new MatTableDataSource(this.listOfData);

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.listOfData = [...this.events];
      this.eventDataSource = new MatTableDataSource(this.listOfData);
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  registerEvent(newEvent: BaseEvent) {
    this.eventService.registerEvent(newEvent).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        ocassions: this.events
      }
    });

    dialogRef.afterClosed().subscribe(newEvent => {
      if (newEvent) {
        this.registerEvent(newEvent);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.eventDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditForm(event: TableRowEvent): void {
    this.eventToUpdate = Object.assign(event);
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        isEdit: true,
        eventToUpdate: this.eventToUpdate,
        occassions: this.ocassions,
      }
    });

    dialogRef.afterClosed().subscribe(eventToUpdate => {
      if (eventToUpdate) {
        this.editEvent(eventToUpdate, event.id);
      }
      this.refreshTable();
    });
  }

  editEvent(event: TableRowEvent, id: number) {
    this.eventService.editEvent(event, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showDeleteConfirm(eventToDelete: TableRowEvent): void {
    if (confirm('If you confirm,' + eventToDelete.name + ' will be permanently deleted.')) {
      this.deleteEventById(eventToDelete.id)
      this.refreshTable();
    }
  }

  deleteEventById(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
    });
  }
}
