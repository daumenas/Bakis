import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseUser } from '../../models/base-user';
import { NewUser } from '../../models/new-user';
import { UserService } from '../../services/user-service';
import { RegisterComponent } from '../register/register.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowUser } from "../../models/table-row-user";
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-consumer-page',
  templateUrl: './consumer-page.component.html',
  styleUrls: ['./consumer-page.component.css']
})
export class ConsumerPageComponent implements OnInit {
  users: TableRowUser[];

  userToUpdate: TableRowUser;

  employeeIdForEquipment: number;

  clients: BaseUser[] = [];

  isVisibleEquipmentModal = false;

  searchValue = '';
  listOfSearchAddress: string[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfData: TableRowUser[] = [];

  displayedColumns: string[] = ['id', 'role', 'name', 'surname', 'date', 'email', 'actions'];

  consumerDataSource = new MatTableDataSource(this.listOfData);
  

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit() {
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
        this.refreshTable();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.consumerDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditForm(user: TableRowUser): void {
    this.userToUpdate = Object.assign(user);
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '550px',
      data: {
        userToUpdate: this.userToUpdate,
        clients: this.clients,
      }
    });

    dialogRef.afterClosed().subscribe(userToUpdate => {
      if (userToUpdate) {
        this.editUser(userToUpdate, user.id);
      }
      this.refreshTable();
    });
  }

  editUser(user: TableRowUser, id: number) {
    this.userService.editUser(user, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showDeleteConfirm(userToDelete: TableRowUser): void {
    if (confirm('If you confirm,' + userToDelete.name + ' ' + userToDelete.surname + ' will be permanently deleted.')) {
      this.deleteUserById(userToDelete.id)
      this.refreshTable();
    }
  }

  deleteUserById(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.refreshTable();
    });
  }
}
