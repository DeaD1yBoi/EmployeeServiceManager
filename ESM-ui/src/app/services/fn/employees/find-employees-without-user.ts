/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Employees } from '../../models/employees';

export interface FindEmployeesWithoutUser$Params {
}

export function findEmployeesWithoutUser(http: HttpClient, rootUrl: string, params?: FindEmployeesWithoutUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Employees>>> {
  const rb = new RequestBuilder(rootUrl, findEmployeesWithoutUser.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Employees>>;
    })
  );
}

findEmployeesWithoutUser.PATH = '/employees/no-role';
