import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BaseEventComponent } from '../base-event/base-event.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseEvent } from '../../models/base-event';
import { CityEventService } from '../../services/city-event.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowEvent } from "../../models/table-row-event";
import { MatPaginator } from '@angular/material/paginator';
import { SendReceiveService } from '../../services/send-receive.service';
import { MatSort } from '@angular/material/sort';
import { EventUserListComponent } from '../event-user-list/event-user-list.component';
import { TranslateService } from '@ngx-translate/core';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private translation: TranslateService,
    private eventService: CityEventService,
    private translate: TranslateService,
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
      this.eventDataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = '';
    });
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

  openSubmitModal(): void {
    const dialogRef = this.dialog.open(BaseEventComponent, {
      width: '550px',
      data: {
        submitEvent: this.translation.instant('modal.submitEvent')
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
    if (confirm(this.translate.instant('snackbar.ifConfirm') + eventToDelete.name + this.translate.instant('snackbar.permenantly'))) {
      this.deleteEventById(eventToDelete.id)
    }
  }

  loadStatus(event: TableRowEvent, isStyle: boolean): string {
    if (event.approval) {
      this.status = this.translation.instant('table.approved');
      this.style = "color: green";
    } else {
      this.status = this.translation.instant('table.waiting');
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
