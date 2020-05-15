import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BaseEventComponent } from '../base-event/base-event.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseEvent } from '../../models/base-event';
import { CityEventService } from '../../services/city-event.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowEvent } from "../../models/table-row-event";
import { MatPaginator } from '@angular/material/paginator';
import { SendReceiveService } from '../../services/send-receive.service';

@Component({
  selector: 'app-submit-event',
  templateUrl: './submit-event.component.html',
  styleUrls: ['./submit-event.component.css']
})
export class SubmitEventComponent implements OnInit {
  events: TableRowEvent[];
  listOfData: TableRowEvent[] = [];
  status: string;
  style: string;
  private thisUserId: number;

  displayedColumns: string[] = ['status', 'name', 'description', 'points',
    'address', 'latitude', 'longitude', 'dateFrom', 'dateTo', 'time', 'endTime', 'amount', 'checkedIn', 'actions'];

  eventDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild('eventPaginator') paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private eventService: CityEventService,
    private sendReceiveService: SendReceiveService) { }

  ngOnInit(): void {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    this.refreshTable();
    this.sendReceiveService.pointsReceive$.subscribe((data) => {
      this.refreshTable();
    });
  }

  refreshTable() {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.filter(event => {
        return event.createdBy === this.thisUserId;
      });
      this.listOfData = [...this.events];
      this.eventDataSource = new MatTableDataSource(this.listOfData);
      this.eventDataSource.paginator = this.paginator;
    });
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

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.eventDataSource.filter = filterValue.trim().toLowerCase();
  }

  showDeleteConfirm(eventToDelete: TableRowEvent): void {
    if (confirm('If you confirm,' + eventToDelete.name + ' will be permanently deleted.')) {
      this.deleteEventById(eventToDelete.id)
    }
  }

  loadStatus(event: TableRowEvent, isStyle: boolean): string {
    if (event.approval) {
      this.status = "Approved";
      this.style = "color: green";
    } else {
      this.status = "Waiting";
      this.style = "color: blue";
    }
    if (isStyle) {
      return this.style;
    }
    return this.status;
  }

  deleteEventById(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.refreshTable();
    });
  }

}
