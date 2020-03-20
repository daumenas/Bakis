import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseEvent } from '../../models/base-event';
import { EventService } from '../../services/event-service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowEvent } from "../../models/table-row-event";
import { AddEventComponent } from '../add-event/add-event.component';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  events: TableRowEvent[];

  employeeIdForEquipment: number;

  ocassions: BaseEvent[] = [];

  isVisibleEquipmentModal = false;

  searchValue = '';
  listOfSearchAddress: string[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfData: TableRowEvent[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'points', 'address', 'latitude', 'longtitude', 'fromDate', 'toDate'];

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
    const dialogRef = this.dialog.open(AddEventComponent, {
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
}
