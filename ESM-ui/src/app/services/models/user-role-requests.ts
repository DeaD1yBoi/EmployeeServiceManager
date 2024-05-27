/* tslint:disable */
/* eslint-disable */
import { Roles } from '../models/roles';
import { Services } from '../models/services';
import { Status } from '../models/status';
import { Users } from '../models/users';
export interface UserRoleRequests {
  createdDate?: string;
  id?: number;
  lastModifiedDate?: string;
  modifiedByUser?: Users;
  note?: string;
  requestedRole?: Roles;
  requestedService?: Services;
  roleThatCanRespond?: Roles;
  status?: Status;
  userRoleRequestedBy?: Users;
}
