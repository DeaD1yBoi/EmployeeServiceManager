/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findUserById } from '../fn/user/find-user-by-id';
import { FindUserById$Params } from '../fn/user/find-user-by-id';
import { getAllUsersWithDetails } from '../fn/user/get-all-users-with-details';
import { GetAllUsersWithDetails$Params } from '../fn/user/get-all-users-with-details';
import { getMyUserDetails } from '../fn/user/get-my-user-details';
import { GetMyUserDetails$Params } from '../fn/user/get-my-user-details';
import { setNewPasswordForUserByAdmin } from '../fn/user/set-new-password-for-user-by-admin';
import { SetNewPasswordForUserByAdmin$Params } from '../fn/user/set-new-password-for-user-by-admin';
import { UserWrapper } from '../models/user-wrapper';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setNewPasswordForUserByAdmin()` */
  static readonly SetNewPasswordForUserByAdminPath = '/users/set-new-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setNewPasswordForUserByAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setNewPasswordForUserByAdmin$Response(params: SetNewPasswordForUserByAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return setNewPasswordForUserByAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setNewPasswordForUserByAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setNewPasswordForUserByAdmin(params: SetNewPasswordForUserByAdmin$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.setNewPasswordForUserByAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `getAllUsersWithDetails()` */
  static readonly GetAllUsersWithDetailsPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsersWithDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsersWithDetails$Response(params?: GetAllUsersWithDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserWrapper>>> {
    return getAllUsersWithDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsersWithDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsersWithDetails(params?: GetAllUsersWithDetails$Params, context?: HttpContext): Observable<Array<UserWrapper>> {
    return this.getAllUsersWithDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserWrapper>>): Array<UserWrapper> => r.body)
    );
  }

  /** Path part for operation `findUserById()` */
  static readonly FindUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById$Response(params: FindUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWrapper>> {
    return findUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById(params: FindUserById$Params, context?: HttpContext): Observable<UserWrapper> {
    return this.findUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserWrapper>): UserWrapper => r.body)
    );
  }

  /** Path part for operation `getMyUserDetails()` */
  static readonly GetMyUserDetailsPath = '/users/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyUserDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyUserDetails$Response(params?: GetMyUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWrapper>> {
    return getMyUserDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyUserDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyUserDetails(params?: GetMyUserDetails$Params, context?: HttpContext): Observable<UserWrapper> {
    return this.getMyUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserWrapper>): UserWrapper => r.body)
    );
  }

}
