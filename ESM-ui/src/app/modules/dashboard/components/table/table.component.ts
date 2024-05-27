import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  tableHeaders: string[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private dialog: MatDialog) {}

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.tableHeaders = Object.keys(this.data[0]);
    }
  }

  formatCell(value: any): string {
    if(typeof value != 'number' && value != null && typeof value != 'boolean') {
      const date = new Date(value);
      if(!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return this.sortDirection === 'asc'
          ? valueA === valueB
            ? 0
            : valueA
            ? -1
            : 1
          : valueA === valueB
          ? 0
          : valueA
          ? 1
          : -1;
      }

      return 0;
    });
  }

  openDialog(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = item;
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
