    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class DocumentLibraryService {
      constructor() { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ }

      getDocuments(resource: any): Observable<any> {
        console.log('DocumentLibraryService: Mock data qaytarılır (getDocuments).');
        const mockDocuments = []; // Boş sənəd listi
        const mockResponseHeader = {
          pageSize: resource.pageSize,
          skip: resource.skip,
          totalCount: mockDocuments.length,
          pageCount: Math.ceil(mockDocuments.length / resource.pageSize),
        };
        return of({
          body: mockDocuments,
          headers: {
            get: (headerName: string) => {
              if (headerName === 'X-Pagination') {
                return JSON.stringify(mockResponseHeader);
              }
              return null;
            }
          }
        });
      }

      getDocumentLibrary(id: string): Observable<any> {
        console.log('DocumentLibraryService: Mock data qaytarılır (getDocumentLibrary).');
        return of(null);
      }

      getDocumentViewLibrary(id: string): Observable<any> {
        console.log('DocumentLibraryService: Mock data qaytarılır (getDocumentViewLibrary).');
        return of(null);
      }
    }
    