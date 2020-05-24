import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseEvent } from '../../models/base-event';
import { CityEventService } from '../../services/city-event.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowEvent } from "../../models/table-row-event";
import { BaseEventComponent } from '../base-event/base-event.component';
import { MatPaginator } from '@angular/material/paginator';
import { SendReceiveService } from '../../services/send-receive.service';
import { EventUserListComponent } from '../event-user-list/event-user-list.component';


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
  isApproval: boolean = false;
  switchText: string = "Switch to submissions";
  editText: string = "Edit";
  saveEditText: string = "Edit event";

  displayedColumns: string[] = ['id', 'name', 'description', 'points',
    'address', 'latitude', 'longitude', 'dateFrom', 'dateTo', 'time', 'endTime', 'amount', 'checkedIn', 'userlist', 'actions'];

  eventDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild('eventPaginator') paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private eventService: CityEventService,
    private sendReceiveService: SendReceiveService
  ) { }

  ngOnInit() {
    this.refreshTable();
    this.sendReceiveService.pointsReceive$.subscribe((data) => {
      this.refreshTable();
    });
  }

  refreshTable() {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.filter(event => {
        return event.approval === !this.isApproval
      });
      this.listOfData = [...this.events];
      this.eventDataSource = new MatTableDataSource(this.listOfData);
      this.eventDataSource.paginator = this.paginator;
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

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.eventDataSource.filter = filterValue.trim().toLowerCase();
  }

  openUserList(event: TableRowEvent): void {
    const dialogRef = this.dialog.open(EventUserListComponent, {
      width: '550px',
      data: {
        id: event.id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openEditForm(event: TableRowEvent): void {
    this.eventToUpdate = Object.assign(event);
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        isEdit: true,
        eventToUpdate: this.eventToUpdate,
        occassions: this.ocassions,
        saveEditText: this.saveEditText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  showDeleteConfirm(eventToDelete: TableRowEvent): void {
    if (confirm('If you confirm,' + eventToDelete.name + ' will be permanently deleted.')) {
      this.deleteEventById(eventToDelete.id)
    }
  }

  showFlushConfirm(eventToDelete: TableRowEvent): void {
    if (confirm('If you confirm,' + eventToDelete.name + ' will have nobody checked in.')) {
      this.flushEventById(eventToDelete);
    }
  }

  flushEventById(event: TableRowEvent) {
    event.checkedIn = 0;
    this.eventService.editEvent(event, event.id).subscribe(() => {
      this.refreshTable();
    });
  }

  deleteEventById(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.refreshTable();
    });
  }

  changeTable() {
    this.isApproval = !this.isApproval;
    if (this.isApproval) {
      this.switchText = "Switch to events";
      this.editText = "Approve"
      this.saveEditText = "Approve event"
    } else {
      this.switchText = "Switch to submissions";
      this.editText = "Edit"
      this.saveEditText = "Edit event"
    }
    this.refreshTable();
  }

}
