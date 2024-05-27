/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createEmployee } from '../fn/employees/create-employee';
import { CreateEmployee$Params } from '../fn/employees/create-employee';
import { Employees } from '../models/employees';
import { EmployeeWrapper } from '../models/employee-wrapper';
import { findAll4 } from '../fn/employees/find-all-4';
import { FindAll4$Params } from '../fn/employees/find-all-4';
import { findEmployeesWithoutUser } from '../fn/employees/find-employees-without-user';
import { FindEmployeesWithoutUser$Params } from '../fn/employees/find-employees-without-user';

@Injectable({ providedIn: 'root' })
export class EmployeesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createEmployee()` */
  static readonly CreateEmployeePath = '/employees/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createEmployee()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEmployee$Response(params: CreateEmployee$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createEmployee(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createEmployee$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEmployee(params: CreateEmployee$Params, context?: HttpContext): Observable<{
}> {
    return this.createEmployee$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findAll4()` */
  static readonly FindAll4Path = '/employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4$Response(params?: FindAll4$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EmployeeWrapper>>> {
    return findAll4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4(params?: FindAll4$Params, context?: HttpContext): Observable<Array<EmployeeWrapper>> {
    return this.findAll4$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EmployeeWrapper>>): Array<EmployeeWrapper> => r.body)
    );
  }

  /** Path part for operation `findEmployeesWithoutUser()` */
  static readonly FindEmployeesWithoutUserPath = '/employees/no-role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findEmployeesWithoutUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findEmployeesWithoutUser$Response(params?: FindEmployeesWithoutUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Employees>>> {
    return findEmployeesWithoutUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findEmployeesWithoutUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findEmployeesWithoutUser(params?: FindEmployeesWithoutUser$Params, context?: HttpContext): Observable<Array<Employees>> {
    return this.findEmployeesWithoutUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Employees>>): Array<Employees> => r.body)
    );
  }

}
