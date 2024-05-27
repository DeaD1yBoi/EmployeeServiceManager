import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith } from 'rxjs';
import { RequestsService } from '../../../../services/services';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  showButtons: boolean = false;
  tableHeaders: string[] = [];
  href: string = '';
  note: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private requestService: RequestsService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.href = window.location.href;
    this.showButtons = this.href.endsWith('authorized');
    this.tableHeaders = Object.keys(this.data);
  }

  formatColumnHeader(header: string): string {
    switch (header) {
      case 'id':
        return 'ID';
      case 'srvTitle':
        return 'Service Title';
      case 'srvNames':
        return 'Has access to';
      case 'roleDesc':
        return 'Description';
      case 'posTitle':
        return 'Position';
      case 'depTitle':
        return 'Department';
      default:
        return header
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/^./, (str) => str.toUpperCase());
    }
  }

  formatCell(value: any): string {
    if (typeof value != 'number' && value != null && typeof value != 'boolean') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }

  getTitle() {
    const endingPart = this.href.split('/').pop();
    switch (endingPart) {
      case 'authorized':
        return 'Authorized Requests';
      case 'roles':
        return 'Roles';
      case 'users':
        return 'Users';
      case 'services':
        return 'Services';
      case 'requests':
        return 'Requests';
      default:
        return '###???###???';
    }
  }

  getIconClass(header: string): string {
    switch (header) {
      case 'id':
        return 'fas fa-id-card';
      case 'createdDate':
        return 'fas fa-calendar-alt';
      case 'lastModifiedDate':
        return 'fas fa-clock';
      case 'note':
        return 'fas fa-sticky-note';
      case 'lastModifiedBy':
        return 'fas fa-user-edit';
      case 'requestedRole':
        return 'fas fa-user-tag';
      case 'requestedService':
        return 'fas fa-server';
      case 'currentStatus':
        return 'fas fa-spinner';
      case 'userRoleRequestedBy':
        return 'fas fa-user';
      case 'roleThatCanRespond':
        return 'fas fa-users';
      case 'username':
        return 'fa-solid fa-signature';
      case 'fullName':
        return 'fa-solid fa-signature';
      case 'posTitle':
        return 'fa-solid fa-briefcase';
      case 'depTitle':
        return 'fa-solid fa-users-between-lines';
      case 'roleNames':
        return 'fa-solid fa-gear';
      case 'srvNames':
        return 'fa-solid fa-wrench';
      case 'roleName':
        return 'fa-solid fa-file-signature';
      case 'roleDesc':
        return 'fa-solid fa-sticky-note';
      case 'service':
        return 'fa-solid fa-wrench';
      case 'owner':
        return 'fa-solid fa-user-tie';
      case 'srvTitle':
        return 'fa-solid fa-file-signature';
      default:
        return 'fas fa-question-circle text-muted';
    }
  }

  onApprove(id: number) {
    this.requestService
      .respondRequest({ body: { id: id, note: this.note, response: true } })
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.router.navigate(['dashboard/requests']);
          this.snackBar.openSnackBar('Request Approved', '', 5000);
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['dashboard/requests']);
          this.snackBar.openSnackBar('Failed to approve request', 'Error', 5000);
        },
      });
  }

  onReject(id: number) {
    this.requestService
      .respondRequest({ body: { id: id, note: this.note, response: false }})
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.router.navigate(['dashboard/requests']);
          this.snackBar.openSnackBar('Request Rejected', '', 1000);
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['dashboard/requests']);
          this.snackBar.openSnackBar('Failed to reject request', 'Error', 5000);
        },
      });
  }

}
