    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';

    @Injectable({ providedIn: 'root' })
    export class CategoryService {
      constructor() { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ }

      getAllCategories(): Observable<any[]> {
        console.log('CategoryService: Mock data qaytarılır (getAllCategories).');
        return of([]);
      }

      delete(id: any): Observable<any> {
        console.log('CategoryService: Mock data qaytarılır (delete).');
        return of(null);
      }

      update(category: any): Observable<any> {
        console.log('CategoryService: Mock data qaytarılır (update).');
        return of(null);
      }

      add(category: any): Observable<any> {
        console.log('CategoryService: Mock data qaytarılır (add).');
        return of(null);
      }

      getSubCategories(id: string): Observable<any[]> {
        console.log('CategoryService: Mock data qaytarılır (getSubCategories).');
        return of([]);
      }

      getAllCategoriesForDropDown(): Observable<any[]> {
        console.log('CategoryService: Mock data qaytarılır (getAllCategoriesForDropDown).');
        return of([]);
      }
    }
    