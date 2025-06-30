import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

// Bütün HttpClient, Router, ClonerService, CommonHttpErrorService importları silindi, çünki API zəng etmirik
// import { HttpClient } from '@angular/common/http';
// import { tap, catchError, delay } from 'rxjs/operators';
import { UserAuth } from '../domain-classes/user-auth';
// import { CommonHttpErrorService } from '../error-handler/common-error.service';
// import { CommonError } from '../error-handler/common-error';
// import { Router } from '@angular/router';
// import { ClonerService } from '@core/services/clone.service';
import { CompanyProfile } from '@core/domain-classes/company-profile';
// import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  securityObject: UserAuth = new UserAuth();
  tokenTime: Date;
  clearTimeOutData: any;

  private securityObject$: BehaviorSubject<UserAuth> =
    new BehaviorSubject<UserAuth>(null as any);
  private _companyProfile$: BehaviorSubject<CompanyProfile> =
    new BehaviorSubject<CompanyProfile>(null as any);
  
  public get SecurityObject(): Observable<UserAuth> {
    return of({
      isAuthenticated: true,
      claims: [],
      user: {
        id: 'mock-user-id',
        firstName: 'Mock',
        lastName: 'User',
        phoneNumber: '12345',
        userName: 'mockuser',
        email: 'mock@example.com',
      },
      status: 'Active',
      authorisation: {
        token: 'mock-token',
        type: 'Bearer',
      },
      tokenTime: new Date(),
    });
  }

  public get companyProfile(): Observable<CompanyProfile> {
    const mockCompanyProfile: CompanyProfile = {
      id: 'mock-company-id',
      title: 'Mock Company Title',
      address: 'Mock Address',
      email: 'mock@mock.com',
      phone: '123-456-7890',
      isActive: true,
      totalStorageUsed: 500,
      totalStorage: 1000,
      languages: []
    };
    return of(mockCompanyProfile);
  }

  constructor() { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ }

  isUserAuthenticate(): boolean {
    console.log('SecurityService: isUserAuthenticate bypass edildi.');
    return true;
  }

  login(entity: any): Observable<UserAuth> {
    console.log('SecurityService: Login bypass edildi.');
    const mockUserAuth: UserAuth = {
      isAuthenticated: true,
      claims: [],
      user: {
        id: 'mock-logged-in-user',
        firstName: 'Logged',
        lastName: 'User',
        phoneNumber: '123',
        userName: 'test',
        email: 'test@example.com',
      },
      status: 'Active',
      authorisation: {
        token: 'mock-logged-in-token',
        type: 'Bearer',
      },
      tokenTime: new Date(),
    };
    return of(mockUserAuth);
  }

  refreshToken() {
    console.log('SecurityService: refreshToken bypass edildi.');
  }

  refresh(): Observable<UserAuth> {
    console.log('SecurityService: refresh bypass edildi.');
    return of(this.securityObject);
  }

  private parseSecurityObj(): boolean {
    console.log('SecurityService: parseSecurityObj bypass edildi.');
    return true;
  }

  logout(): void {
    console.log('SecurityService: logout bypass edildi.');
  }

  updateProfile(companyProfile: CompanyProfile) {
    console.log('SecurityService: updateProfile bypass edildi.');
    this._companyProfile$.next(companyProfile);
  }

  resetSecurityObject(): void {
    console.log('SecurityService: resetSecurityObject bypass edildi.');
  }

  // BU METODU DƏYİŞDİRİK Kİ, HƏMİŞƏ TRUE QAYTARSIN
  hasClaim(claimType: any, claimValue?: any): boolean {
    console.log(`SecurityService: hasClaim('${claimType}') bypass edildi.`);
    return true; // <-- ƏSAS DƏYİŞİKLİK BURADIR: HƏMİŞƏ TRUE QAYTARIRIQ
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    console.log('SecurityService: isClaimValid bypass edildi.');
    return true; // Həmişə true
  }

  getUserDetail(): UserAuth {
    console.log('SecurityService: getUserDetail bypass edildi.');
    return {
      isAuthenticated: true,
      claims: [],
      user: { id: 'mock-user', firstName: 'Demo', lastName: 'User', phoneNumber: '123', userName: 'demo', email: 'demo@example.com' },
      status: 'Active',
      authorisation: { token: 'mock-token', type: 'Bearer' },
      tokenTime: new Date(),
    };
  }

  setUserDetail(user: UserAuth) {
    console.log('SecurityService: setUserDetail bypass edildi.');
  }
}
