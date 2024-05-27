/* tslint:disable */
/* eslint-disable */
import { Departments } from '../models/departments';
import { Positions } from '../models/positions';
export interface Employees {
  department?: Departments;
  fullName?: string;
  id?: number;
  position?: Positions;
}
