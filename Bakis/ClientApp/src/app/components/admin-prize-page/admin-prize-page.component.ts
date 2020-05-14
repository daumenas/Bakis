import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableRowPrize } from '../../models/table-row-prize';
import { BasePrize } from '../../models/base-prize';
import { PrizeService } from '../../services/prize.service';
import { BasePrizeComponent } from '../base-prize/base-prize.component';

@Component({
  selector: 'app-admin-prize-page',
  templateUrl: './admin-prize-page.component.html',
  styleUrls: ['./admin-prize-page.component.css']
})
export class AdminPrizePageComponent implements OnInit {
  prizes: TableRowPrize[] = [];
  prizeToUpdate: TableRowPrize;
  basePrizes: BasePrize[] = [];
  listOfData: TableRowPrize[] = [];
  displayedColumns: string[] = ['id','picture', 'name', 'description', 'points', 'actions'];
  prizeDataSource = new MatTableDataSource(this.listOfData);


  @ViewChild('prizePaginator') paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private prizeService: PrizeService,
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.prizeService.getAllPrizes().subscribe(prizes => {
      this.prizes = prizes;
      this.listOfData = [...this.prizes];
      this.prizeDataSource = new MatTableDataSource(this.listOfData);
      this.prizeDataSource.paginator = this.paginator;
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prizeDataSource.filter = filterValue.trim().toLowerCase();
  }

  registerPrize(newPrize: BasePrize) {
    this.prizeService.registerPrize(newPrize).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(BasePrizeComponent, {
      width: '550px',
      data: {
        basePrizes: this.prizes
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
    });
  }

  openEditForm(prize: TableRowPrize): void {
    this.prizeToUpdate = Object.assign(prize);
    const dialogRef = this.dialog.open(BasePrizeComponent, {
      width: '550px',
      data: {
        isEdit: true,
        prizeToUpdate: this.prizeToUpdate,
        basePrizes: this.basePrizes,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
    });
  }

  editPrize(prize: TableRowPrize, id: number) {
    this.prizeService.editPrize(prize, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showDeleteConfirm(prizeToDelete: TableRowPrize): void {
    if (confirm('If you confirm,' + prizeToDelete.name + ' will be permanently deleted.')) {
      this.deletePrizeById(prizeToDelete.id)
    }
  }

  deletePrizeById(id: number) {
    this.prizeService.deletePrize(id).subscribe(() => {
      this.refreshTable();
    });
  }
}