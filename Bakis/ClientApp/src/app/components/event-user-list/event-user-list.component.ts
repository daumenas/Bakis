import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityEventService } from '../../services/city-event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SendReceiveService } from '../../services/send-receive.service';
import { UserService } from '../../services/user.service';
import { BaseUser } from '../../models/base-user';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-event-user-list',
  templateUrl: './event-user-list.component.html',
  styleUrls: ['./event-user-list.component.css']
})
export class EventUserListComponent implements OnInit {
  userIds: number[];
  listOfData: number[] = [];
  users: BaseUser[];
  filtered: BaseUser[];

  displayedColumns: string[] = ['name', 'lastname'];

  userDataSource = new MatTableDataSource(this.filtered);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private eventService: CityEventService,
    private userService: UserService,
    private sendReceiveService: SendReceiveService
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.eventService.getEventByIdList(this.data.id).subscribe(event => {
      this.userIds = event.userEvent.map(data => data.consumerId);
      this.listOfData = [...this.userIds];
      this.getUserNames();
      this.sendReceiveService.eventReceive$.subscribe(() => {
        this.userDataSource = new MatTableDataSource(this.filtered);
        this.userDataSource.paginator = this.paginator;
        this.userDataSource.sort = this.sort;
      })
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(user: Event) {
    const filterValue = (user.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserNames() {
    console.log();
    this.userService.getAllUsers().subscribe(users => {
      this.filtered = users.filter(data => {
        return this.listOfData.indexOf(data.id) !== -1
      })
      this.sendReceiveService.eventSender(true);
    })
  }
}
