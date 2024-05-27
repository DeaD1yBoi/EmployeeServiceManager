/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateRequestBody } from '../../models/update-request-body';

export interface RespondRequest$Params {
      body: UpdateRequestBody
}

export function respondRequest(http: HttpClient, rootUrl: string, params: RespondRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
  const rb = new RequestBuilder(rootUrl, respondRequest.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: string;
      }>;
    })
  );
}

respondRequest.PATH = '/requests/respond-request';
