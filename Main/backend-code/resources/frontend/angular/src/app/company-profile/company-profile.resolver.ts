    import { Injectable } from '@angular/core';
    import {
        Resolve,
        ActivatedRouteSnapshot,
        RouterStateSnapshot
    } from '@angular/router';
    import { CompanyProfile } from '@core/domain-classes/company-profile';
    import { Observable, of } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class CompanyProfileResolver implements Resolve<CompanyProfile> {
        constructor() { /* intentionally empty */ } // Boş konstruktor

        resolve(
            _route: ActivatedRouteSnapshot, // İstifadə olunmadığı üçün adını `_route` etdik
            _state: RouterStateSnapshot // İstifadə olunmadığı üçün adını `_state` etdik
        ): Observable<CompanyProfile> | null {
            const mockProfile: CompanyProfile = {
                id: 'mock-id-frontend',
                title: 'Mock Document Management System',
                address: 'Mock Street 456, Mocktown',
                email: 'info@mockdocument.com',
                phone: '+1 987 654 3210',
                logoUrl: 'https://placehold.co/150x50/aabbcc/ffffff?text=Your+Logo',
                isActive: true, 
                totalStorageUsed: 500, 
                totalStorage: 2000, 
                languages: []
            };
            return of(mockProfile);
        }
    }
    