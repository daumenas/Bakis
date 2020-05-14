import { Component, OnInit, Inject, ViewChild, OnChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TableRowPrize } from '../../models/table-row-prize';
import { BasePrize } from '../../models/base-prize';
import { PrizeService } from '../../services/prize.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseUser } from '../../models/base-user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-prize-page',
  templateUrl: './user-prize-page.component.html',
  styleUrls: ['./user-prize-page.component.css']
})
export class UserPrizePageComponent implements OnInit {
  prizes: TableRowPrize[] = [];
  prizeToUpdate: TableRowPrize;
  basePrizes: BasePrize[] = [];
  listOfData: TableRowPrize[] = [];
  points: number;
  displayedColumns: string[] = ['id', 'picture', 'name', 'description', 'actions'];
  user: BaseUser;
  private thisUserId: number;

  @ViewChild('prizePaginator') paginator: MatPaginator;

  constructor(
    public snackbar: MatSnackBar,
    private userService: UserService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private prizeService: PrizeService,
  ) { }

  ngOnInit() {
    this.refreshTable();
    this.loadPoints()
  }

  ngOnChanges() {
    this.loadPoints()
  }

  refreshTable() {
    this.prizeService.getAllPrizes().subscribe(prizes => {
      this.prizes = prizes;
      this.listOfData = [...this.prizes];
    });
    this.listOfData = [...this.prizes];
  }

  getPrize(prize: TableRowPrize) {
    this.thisUserId = JSON.parse(localStorage.getItem('userId'));
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user.points < prize.points) {
        let need = prize.points - this.user.points;
        this.snackbar.open("Insufficient points(Need: " + need + ")", null, {
          duration: 1500
        });
      } else {
        if (confirm("If you confirm," + prize.name + "will be yours for" + prize.points)) {
          /* INSERT LOGIC */
          this.user.points = user.points - prize.points;
          this.userService.editUser(this.user, this.thisUserId).subscribe( data => {
            this.loadPoints();
            this.refreshTable();
          });
        }
      }
    })
  }

  loadPoints() {
    if (this.authService.isAuthenticated()) {
      this.userService.getUser().subscribe(data => {
        this.points = data.points
      });
    }
  }

  loggedIn() {
    return this.authService.isAuthenticated()
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }
}

