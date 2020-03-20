import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseUser } from '../../models/base-user';
import { NewUser } from '../../models/new-user';
import { UserService } from '../../services/user-service';
import { RegisterComponent } from '../register/register.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowUser } from "../../models/table-row-user";


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-consumer-page',
  templateUrl: './consumer-page.component.html',
  styleUrls: ['./consumer-page.component.css']
})
export class ConsumerPageComponent implements OnInit {
  users: TableRowUser[];

  employeeIdForEquipment: number;

  clients: BaseUser[] = [];

  isVisibleEquipmentModal = false;

  searchValue = '';
  listOfSearchAddress: string[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfData: TableRowUser[] = [];

  displayedColumns: string[] = ['id', 'role', 'name', 'surname', 'date', 'email'];

  consumerDataSource = new MatTableDataSource(this.listOfData);
  

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.users);
    this.refreshTable();
  }

  refreshTable() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.listOfData = [...this.users];
      this.consumerDataSource = new MatTableDataSource(this.listOfData);
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  registerUser(newUser: NewUser) {
    this.userService.registerUser(newUser).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '550px',
      data: {
        clients: this.users
      }
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.registerUser(newUser);
      }
    });
  }

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.consumerDataSource.filter = filterValue.trim().toLowerCase();
  }
}
