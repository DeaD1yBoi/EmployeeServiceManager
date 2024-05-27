/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll1 } from '../fn/roles/find-all-1';
import { FindAll1$Params } from '../fn/roles/find-all-1';
import { findMyRoles } from '../fn/roles/find-my-roles';
import { FindMyRoles$Params } from '../fn/roles/find-my-roles';
import { RolesWrapper } from '../models/roles-wrapper';

@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAll1()` */
  static readonly FindAll1Path = '/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1$Response(params?: FindAll1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RolesWrapper>>> {
    return findAll1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1(params?: FindAll1$Params, context?: HttpContext): Observable<Array<RolesWrapper>> {
    return this.findAll1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RolesWrapper>>): Array<RolesWrapper> => r.body)
    );
  }

  /** Path part for operation `findMyRoles()` */
  static readonly FindMyRolesPath = '/roles/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMyRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMyRoles$Response(params?: FindMyRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RolesWrapper>>> {
    return findMyRoles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMyRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMyRoles(params?: FindMyRoles$Params, context?: HttpContext): Observable<Array<RolesWrapper>> {
    return this.findMyRoles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RolesWrapper>>): Array<RolesWrapper> => r.body)
    );
  }

}
