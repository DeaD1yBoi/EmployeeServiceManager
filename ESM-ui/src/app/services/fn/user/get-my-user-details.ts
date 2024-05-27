/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserWrapper } from '../../models/user-wrapper';

export interface GetMyUserDetails$Params {
}

export function getMyUserDetails(http: HttpClient, rootUrl: string, params?: GetMyUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWrapper>> {
  const rb = new RequestBuilder(rootUrl, getMyUserDetails.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserWrapper>;
    })
  );
}

getMyUserDetails.PATH = '/users/me';
