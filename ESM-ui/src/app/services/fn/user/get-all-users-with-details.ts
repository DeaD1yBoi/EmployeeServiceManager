/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserWrapper } from '../../models/user-wrapper';

export interface GetAllUsersWithDetails$Params {
}

export function getAllUsersWithDetails(http: HttpClient, rootUrl: string, params?: GetAllUsersWithDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserWrapper>>> {
  const rb = new RequestBuilder(rootUrl, getAllUsersWithDetails.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserWrapper>>;
    })
  );
}

getAllUsersWithDetails.PATH = '/users';
