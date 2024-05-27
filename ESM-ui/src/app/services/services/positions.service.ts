/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll3 } from '../fn/positions/find-all-3';
import { FindAll3$Params } from '../fn/positions/find-all-3';
import { Positions } from '../models/positions';

@Injectable({ providedIn: 'root' })
export class PositionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAll3()` */
  static readonly FindAll3Path = '/positions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3$Response(params?: FindAll3$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Positions>>> {
    return findAll3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3(params?: FindAll3$Params, context?: HttpContext): Observable<Array<Positions>> {
    return this.findAll3$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Positions>>): Array<Positions> => r.body)
    );
  }

}
