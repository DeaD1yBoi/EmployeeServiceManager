/* tslint:disable */
/* eslint-disable */
import { Employees } from '../models/employees';
import { GrantedAuthority } from '../models/granted-authority';
import { Roles } from '../models/roles';
export interface Users {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  empId?: Employees;
  enabled?: boolean;
  id?: number;
  name?: string;
  password?: string;
  roles?: Array<Roles>;
  username?: string;
}
