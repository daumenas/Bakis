import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from '../../services/location.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowSight } from "../../models/table-row-sight";
import { BaseSightComponent } from '../base-sight/base-sight.component';
import { MatPaginator } from '@angular/material/paginator';
import { BaseSight } from '../../models/base-sight';


@Component({
  selector: 'app-sight-page',
  templateUrl: './sight-page.component.html',
  styleUrls: ['./sight-page.component.css']
})
export class SightPageComponent implements OnInit {
  sights: TableRowSight[];
  sightToUpdate: TableRowSight;

  baseSights: BaseSight[] = [];

  listOfData: TableRowSight[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'points',
    'address', 'latitude', 'longitude', 'checkedIn', 'actions'];

  sightDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild('sightPaginator') paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private sightService: LocationService,
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.sightService.getAllSights().subscribe(sights => {
      this.sights = sights;
      this.listOfData = [...this.sights];
      this.sightDataSource = new MatTableDataSource(this.listOfData);
      this.sightDataSource.paginator = this.paginator;
    });
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sightDataSource.filter = filterValue.trim().toLowerCase();
  }

  registerSight(newSight: BaseSight) {
    this.sightService.registerSight(newSight).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(BaseSightComponent, {
      width: '550px',
      data: {
        baseSights: this.sights
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
    });
  }

  openEditForm(sight: TableRowSight): void {
    this.sightToUpdate = Object.assign(sight);
    const dialogRef = this.dialog.open(BaseSightComponent, {
      width: '550px',
      data: {
        isEdit: true,
        sightToUpdate: this.sightToUpdate,
        baseSights: this.baseSights,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
    });
  }

  editSight(sight: TableRowSight, id: number) {
    this.sightService.editSight(sight, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showDeleteConfirm(sightToDelete: TableRowSight): void {
    if (confirm('If you confirm,' + sightToDelete.name + ' will be permanently deleted.')) {
      this.deleteSightById(sightToDelete.id)
    }
  }

  deleteSightById(id: number) {
    this.sightService.deleteSight(id).subscribe(() => {
      this.refreshTable();
    });
  }
}
