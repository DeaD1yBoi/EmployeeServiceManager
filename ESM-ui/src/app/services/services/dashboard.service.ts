/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { DashboardCountResponse } from '../models/dashboard-count-response';
import { getCount } from '../fn/dashboard/get-count';
import { GetCount$Params } from '../fn/dashboard/get-count';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCount()` */
  static readonly GetCountPath = '/dashboard/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCount$Response(params?: GetCount$Params, context?: HttpContext): Observable<StrictHttpResponse<DashboardCountResponse>> {
    return getCount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCount(params?: GetCount$Params, context?: HttpContext): Observable<DashboardCountResponse> {
    return this.getCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<DashboardCountResponse>): DashboardCountResponse => r.body)
    );
  }

}
