/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRoleRequestRequest } from '../../models/user-role-request-request';
import { UserRoleRequests } from '../../models/user-role-requests';

export interface CreateRequest$Params {
      body: UserRoleRequestRequest
}

export function createRequest(http: HttpClient, rootUrl: string, params: CreateRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<UserRoleRequests>> {
  const rb = new RequestBuilder(rootUrl, createRequest.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserRoleRequests>;
    })
  );
}

createRequest.PATH = '/requests/create-request';
