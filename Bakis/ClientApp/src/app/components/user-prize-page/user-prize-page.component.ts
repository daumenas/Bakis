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
import { UserPrize } from '../../models/user-prizes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-prize-page',
  templateUrl: './user-prize-page.component.html',
  styleUrls: ['./user-prize-page.component.css']
})
export class UserPrizePageComponent implements OnInit {
  prizes: UserPrize[] = [];
  prizeToUpdate: UserPrize;
  basePrizes: BasePrize[] = [];
  listOfData: UserPrize[] = [];
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
    private translate: TranslateService,
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
    this.prizeService.getAllPrizesByUserId().subscribe(prizes => {
      this.prizes = prizes;
      this.listOfData = [...this.prizes];
    });
    this.listOfData = [...this.prizes];
  }

  getPrize(prize: UserPrize) {
    if (!prize.isPrizeClaimed) {
      this.thisUserId = JSON.parse(localStorage.getItem('userId'));
      this.userService.getUser().subscribe(user => {
        this.user = user;
        if (this.user.points < prize.points) {
          let need = prize.points - this.user.points;
          this.snackbar.open(this.translate.instant('snackbar.insufficient') + need + ")", null, {
            duration: 1500
          });
        } else {
          if (confirm(this.translate.instant('snackbar.ifConfirm') + prize.name + this.translate.instant('snackbar.willBe') + prize.points)) {
            this.userService.buyPrize(prize.id).subscribe(data => {
              this.loadPoints();
              this.refreshTable();
            });
            this.snackbar.open(this.translate.instant('snackbar.redeem') + prize.description, null, {
              duration: 1500
            });
          }
        }
      })
    } else {
      this.snackbar.open(this.translate.instant('snackbar.redeem') + prize.description, null, {
        duration: 1500
      });
    }
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


