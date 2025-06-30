    import { Injectable } from '@angular/core';
    import {
      CanActivate,
      ActivatedRouteSnapshot,
      RouterStateSnapshot,
      CanActivateChild,
      CanLoad,
      Route,
      UrlSegment // UrlSegment parametri də əlavə edildi
    } from '@angular/router';
    import { Observable, of } from 'rxjs'; // `of` operatörü əlavə edildi

    // Aşağıdakı importlar artıq istifadə edilmir, çünki servis mock olunur.
    // import { ToastrService } from 'ngx-toastr';
    // import { SecurityService } from './security.service';

    @Injectable({ providedIn: 'root' })
    export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
      constructor() { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ } // Boş konstruktor

      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('AuthGuard: Frontend demo üçün autentifikasiya bypass edilir (CanActivate).');
        return true; // Həmişə `true` qaytarır
      }

      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('AuthGuard: Frontend demo üçün autentifikasiya bypass edilir (CanActivateChild).');
        return true; // Həmişə `true` qaytarır
      }

      canLoad(route: Route, segments: UrlSegment[]): boolean {
        console.log('AuthGuard: Frontend demo üçün autentifikasiya bypass edilir (CanLoad).');
        return true; // Həmişə `true` qaytarır
      }
    }
    