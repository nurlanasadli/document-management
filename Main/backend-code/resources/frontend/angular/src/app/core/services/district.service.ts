import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { District } from '@core/domain-classes/district';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { CommonError } from '@core/error-handler/common-error';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  commonHttpErrorService: CommonHttpErrorService
  constructor(private httpClient: HttpClient) {}

 
  getAllDistricts(): Observable<District[]> {
    const url = `districts`;
    return this.httpClient.get<District[]>(url);
  }
}
