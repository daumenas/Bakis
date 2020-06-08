import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { MatSort } from '@angular/material/sort';
import { PrizeService } from '../../services/prize.service';
import { TableRowConsumerPrize } from '../../models/table-row-consumerprize';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-prize-list-page',
  templateUrl: './admin-prize-list-page.component.html',
  styleUrls: ['./admin-prize-list-page.component.css']
})
export class AdminPrizeListPageComponent implements OnInit {
  prizes: TableRowConsumerPrize[] = [];
  listOfData: TableRowConsumerPrize[] = [];
  displayedColumns: string[] = ['ConsumerId', 'email', 'PrizeId', 'name', 'actions'];
  prizesDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private prizeService: PrizeService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.prizeService.getAllConsumerPrizes().subscribe(prizes => {
      this.prizes = prizes;
      this.listOfData = [...this.prizes];
      this.prizesDataSource = new MatTableDataSource(this.listOfData);
      this.prizesDataSource.paginator = this.paginator;
      this.prizesDataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = '';
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prizesDataSource.filter = filterValue.trim().toLowerCase();
  }

  showDeleteConfirm(prizeToDelete: TableRowConsumerPrize): void {
    if (confirm(this.translate.instant('snackbar.ifConfirm') + prizeToDelete.prizeName + this.translate.instant('snackbar.considered') + prizeToDelete.consumerEmail)) {
      this.deleteUserPrizeById(prizeToDelete.consumerId, prizeToDelete.prizeId)
    }
  }

  deleteUserPrizeById(userId: number, prizeId: number) {
    this.prizeService.removeUserPrize(userId, prizeId).subscribe(() => {
      this.refreshTable();
    });
  }
}
