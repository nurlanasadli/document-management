import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // `of` operatörü import edildi

// Aşağıdakı importlar artıq istifadə edilmir, çünki servis mock olunur.
// import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
// import { DocumentInfo } from '@core/domain-classes/document-info';
// import { DocumentResource } from '@core/domain-classes/document-resource';
// import { DocumentVersion } from '@core/domain-classes/documentVersion';
// import { CommonError } from '@core/error-handler/common-error';
// import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // Constructor-dan HttpClient və CommonHttpErrorService-i sildik, çünki istifadə olunmur.
  constructor() { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ }

  // Bütün metodlar mock edilib və ya funksionallıqları silinib.

  updateDocument(
    document: any // Tipini 'any' etdik
  ): Observable<any> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (updateDocument).');
    return of(document); // Sadəcə daxil olan obyekti qaytarırıq
  }

  addDocument(document: any): Observable<any> { // Tipini 'any' etdik
    console.log('DocumentService: Mock data qaytarılır (addDocument).');
    return of(document); // Sadəcə daxil olan obyekti qaytarırıq
  }

  deleteDocument(id: string): Observable<void> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (deleteDocument).');
    return of(null as any); // Boş bir Observable qaytarırıq
  }

  getDocument(id: string): Observable<any> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (getDocument).');
    return of(null); // Boş mock
  }

  getDocuments(
    resource: any // Tipini 'any' etdik
  ): Observable<any> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (getDocuments).');
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

  saveNewVersionDocument(document: any): Observable<any> { // Tipini 'any' etdik
    console.log('DocumentService: Mock data qaytarılır (saveNewVersionDocument).');
    return of(document); // Sadəcə daxil olan obyekti qaytarırıq
  }

  getDocumentVersion(id: string): Observable<any[]> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (getDocumentVersion).');
    return of([]); // Boş versiya listi qaytarırıq
  }

  restoreDocumentVersion(id: string, versionId: string): Observable<any> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (restoreDocumentVersion).');
    return of(true); // Uğurlu əməliyyat mock-u
  }

  getdocumentMetadataById(id: string): Observable<any> { // `| CommonError` silindi
    console.log('DocumentService: Mock data qaytarılır (getdocumentMetadataById).');
    return of(null); // Boş mock
  }
}
