/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RolesWrapper } from '../../models/roles-wrapper';

export interface FindMyRoles$Params {
}

export function findMyRoles(http: HttpClient, rootUrl: string, params?: FindMyRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RolesWrapper>>> {
  const rb = new RequestBuilder(rootUrl, findMyRoles.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<RolesWrapper>>;
    })
  );
}

findMyRoles.PATH = '/roles/me';
