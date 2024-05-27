/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRoleRequestsWrapper } from '../../models/user-role-requests-wrapper';

export interface FindRequestsThatCanBeResponded$Params {
}

export function findRequestsThatCanBeResponded(http: HttpClient, rootUrl: string, params?: FindRequestsThatCanBeResponded$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRoleRequestsWrapper>>> {
  const rb = new RequestBuilder(rootUrl, findRequestsThatCanBeResponded.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserRoleRequestsWrapper>>;
    })
  );
}

findRequestsThatCanBeResponded.PATH = '/requests/authorized-requests';
