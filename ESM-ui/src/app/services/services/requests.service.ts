/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createRequest } from '../fn/requests/create-request';
import { CreateRequest$Params } from '../fn/requests/create-request';
import { findAll2 } from '../fn/requests/find-all-2';
import { FindAll2$Params } from '../fn/requests/find-all-2';
import { findById1 } from '../fn/requests/find-by-id-1';
import { FindById1$Params } from '../fn/requests/find-by-id-1';
import { findRequestsThatCanBeResponded } from '../fn/requests/find-requests-that-can-be-responded';
import { FindRequestsThatCanBeResponded$Params } from '../fn/requests/find-requests-that-can-be-responded';
import { respondRequest } from '../fn/requests/respond-request';
import { RespondRequest$Params } from '../fn/requests/respond-request';
import { UserRoleRequests } from '../models/user-role-requests';
import { UserRoleRequestsWrapper } from '../models/user-role-requests-wrapper';

@Injectable({ providedIn: 'root' })
export class RequestsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `respondRequest()` */
  static readonly RespondRequestPath = '/requests/respond-request';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `respondRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  respondRequest$Response(params: RespondRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return respondRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `respondRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  respondRequest(params: RespondRequest$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.respondRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `createRequest()` */
  static readonly CreateRequestPath = '/requests/create-request';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRequest$Response(params: CreateRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRoleRequests>> {
    return createRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRequest(params: CreateRequest$Params, context?: HttpContext): Observable<UserRoleRequests> {
    return this.createRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserRoleRequests>): UserRoleRequests => r.body)
    );
  }

  /** Path part for operation `findAll2()` */
  static readonly FindAll2Path = '/requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2$Response(params?: FindAll2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRoleRequestsWrapper>>> {
    return findAll2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2(params?: FindAll2$Params, context?: HttpContext): Observable<Array<UserRoleRequestsWrapper>> {
    return this.findAll2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRoleRequestsWrapper>>): Array<UserRoleRequestsWrapper> => r.body)
    );
  }

  /** Path part for operation `findById1()` */
  static readonly FindById1Path = '/requests/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: FindById1$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRoleRequestsWrapper>> {
    return findById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: FindById1$Params, context?: HttpContext): Observable<UserRoleRequestsWrapper> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserRoleRequestsWrapper>): UserRoleRequestsWrapper => r.body)
    );
  }

  /** Path part for operation `findRequestsThatCanBeResponded()` */
  static readonly FindRequestsThatCanBeRespondedPath = '/requests/authorized-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRequestsThatCanBeResponded()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRequestsThatCanBeResponded$Response(params?: FindRequestsThatCanBeResponded$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRoleRequestsWrapper>>> {
    return findRequestsThatCanBeResponded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findRequestsThatCanBeResponded$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRequestsThatCanBeResponded(params?: FindRequestsThatCanBeResponded$Params, context?: HttpContext): Observable<Array<UserRoleRequestsWrapper>> {
    return this.findRequestsThatCanBeResponded$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRoleRequestsWrapper>>): Array<UserRoleRequestsWrapper> => r.body)
    );
  }

}
