import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseUser } from '../../models/base-user';
import { NewUser } from '../../models/new-user';
import { UserService } from '../../services/user.service';
import { RegisterComponent } from '../register/register.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowUser } from "../../models/table-row-user";
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-consumer-page',
  templateUrl: './consumer-page.component.html',
  styleUrls: ['./consumer-page.component.css']
})
export class ConsumerPageComponent implements OnInit {
  users: TableRowUser[];

  userToUpdate: TableRowUser;

  baseUsers: BaseUser[] = [];

  isVisibleEquipmentModal = false;
  listOfData: TableRowUser[] = [];

  displayedColumns: string[] = ['id', 'role', 'name', 'surname', 'points', 'email', 'actions'];

  consumerDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild('consumerPaginator') paginator: MatPaginator;
  

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
      this.consumerDataSource.paginator = this.paginator;
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
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
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
        baseUsers: this.baseUsers,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
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
    }
  }

  deleteUserById(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.refreshTable();
    });
  }
}
