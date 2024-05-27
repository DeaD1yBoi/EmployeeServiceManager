/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createService } from '../fn/services/create-service';
import { CreateService$Params } from '../fn/services/create-service';
import { findAll } from '../fn/services/find-all';
import { FindAll$Params } from '../fn/services/find-all';
import { findById } from '../fn/services/find-by-id';
import { FindById$Params } from '../fn/services/find-by-id';
import { Services } from '../models/services';
import { ServiceWrapper } from '../models/service-wrapper';

@Injectable({ providedIn: 'root' })
export class ServicesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createService()` */
  static readonly CreateServicePath = '/services/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createService$Response(params: CreateService$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createService(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createService(params: CreateService$Params, context?: HttpContext): Observable<{
}> {
    return this.createService$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/services';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Services>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<Services>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Services>>): Array<Services> => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/services/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<ServiceWrapper>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<ServiceWrapper> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ServiceWrapper>): ServiceWrapper => r.body)
    );
  }

}
