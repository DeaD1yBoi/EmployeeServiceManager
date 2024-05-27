/* tslint:disable */
/* eslint-disable */
import { Services } from '../models/services';
export interface Roles {
  id?: number;
  owner?: boolean;
  roleDesc?: string;
  roleName?: string;
  service?: Services;
}
