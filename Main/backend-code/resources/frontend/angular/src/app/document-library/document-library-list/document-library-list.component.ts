    import { HttpResponse } from '@angular/common/http';
    import {
      AfterViewInit,
      Component,
      ElementRef,
      OnInit,
      ViewChild,
    } from '@angular/core';
    import { MatSort } from '@angular/material/sort';
    import { Category } from '@core/domain-classes/category';
    import { ResponseHeader } from '@core/domain-classes/document-header';
    import { DocumentInfo } from '@core/domain-classes/document-info';
    import { DocumentResource } from '@core/domain-classes/document-resource';
    import { CategoryService } from '@core/services/category.service';
    import { OverlayPanel } from '@shared/overlay-panel/overlay-panel.service';
    import { fromEvent, merge, Observable } from 'rxjs';
    import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
    import { BaseComponent } from 'src/app/base.component';
    import { DocumentLibraryService } from '../document-library.service';
    import { DocumentLibraryDataSource } from './document-library-datasource';
    import { SelectionModel } from '@angular/cdk/collections';
    import { BasePreviewComponent } from '@shared/base-preview/base-preview.component';
    import { DocumentView } from '@core/domain-classes/document-view';
    import { DocumentReminderComponent } from '../document-reminder/document-reminder.component';
    import { AddDocumentComponent } from '../add-document/add-document.component';
    import { ReminderListComponent } from '../reminder-list/reminder-list.component';
    import { DocumentCommentComponent } from 'src/app/document/document-comment/document-comment.component';
    import { ClonerService } from '@core/services/clone.service';
    import { DocumentVersion } from '@core/domain-classes/documentVersion';
    import { DocumentVersionHistoryComponent } from 'src/app/document/document-version-history/document-version-history.component';
    import { DocumentService } from 'src/app/document/document.service';
    import { DocumentAuditTrail } from '@core/domain-classes/document-audit-trail';
    import { DocumentOperation } from '@core/domain-classes/document-operation';
    import { TranslationService } from '@core/services/translation.service';
    import { CommonService } from '@core/services/common.service';
    import { ToastrService } from 'ngx-toastr';
    import { MatDialog } from '@angular/material/dialog';
    import { MatPaginator } from '@angular/material/paginator';
    import { DocumentEditComponent } from 'src/app/document/document-edit/document-edit.component';
    import { DocumentCategory } from '@core/domain-classes/document-category';
    import { DocumentPermissionListComponent } from 'src/app/document/document-permission/document-permission-list/document-permission-list.component';
    import { DocumentUploadNewVersionComponent } from 'src/app/document/document-upload-new-version/document-upload-new-version.component';
    import { SendEmailComponent } from 'src/app/document/send-email/send-email.component';
    import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
    import { FormControl } from '@angular/forms';
    import { DatePipe } from '@angular/common';

    @Component({
      selector: 'app-document-library-list',
      templateUrl: './document-library-list.component.html',
      styleUrls: ['./document-library-list.component.scss'],
      viewProviders: [DatePipe],
    })
    export class DocumentLibraryListComponent
      extends BaseComponent
      implements OnInit, AfterViewInit
    {
      dataSource: DocumentLibraryDataSource;
      documents: DocumentInfo[] = [];
      displayedColumns: string[] = [
        'action',
        'name',
        'farmerid',
        'district',
        'categoryName',
        'createdDate',
        // 'expiredDate',
        // 'createdBy',
      ];
      isLoadingResults = true;
      documentResource: DocumentResource;
      categories: Category[] = [];
      allCategories: Category[] = [];
      loading$: Observable<boolean>;

      // `!` (non-null assertion operator) ilə işarələyirik ki, TypeScript xəta verməsin.
      // Lakin `ngAfterViewInit` içində istifadə edərkən mövcudluğunu yoxlamaq vacibdir.
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      @ViewChild('input') input!: ElementRef;
      @ViewChild('metatag') metatag!: ElementRef;
      @ViewChild('farmerid') farmerid!: ElementRef;
      selection = new SelectionModel<DocumentInfo>(true, []);

      createdDate = new FormControl('');

      max = new Date();
      constructor(
        private documentLibraryService: DocumentLibraryService,
        private categoryService: CategoryService,
        public overlay: OverlayPanel,
        public clonerService: ClonerService,
        private documentService: DocumentService,
        private translationService: TranslationService,
        private commonService: CommonService,
        private toastrService: ToastrService,
        private dialog: MatDialog,
        private commonDialogService: CommonDialogService,
        private datePipe: DatePipe
      ) {
        super();
        this.documentResource = new DocumentResource();
        this.documentResource.pageSize = 10;
        this.documentResource.orderBy = 'createdDate desc';
      }

      ngOnInit(): void {
        this.dataSource = new DocumentLibraryDataSource(
          this.documentLibraryService
        );
        this.dataSource.loadDocuments(this.documentResource);
        this.getCategories();
        this.getResourceParameter();
      }

      ngAfterViewInit() {
        // `nativeElement` xətasının qarşısını almaq üçün bu metodun içindəki
        // `fromEvent(this.ELEMENT.nativeElement, ...)` kimi sətirləri şərhə alırıq
        // və ya mövcudluğunu yoxlayırıq.
        // MatSort və MatPaginator da HTML-də tapılmaya bilər, buna görə onların da ilkinləşməsini dayandırırıq.

        // MatSort və MatPaginator-a müraciətləri şərhə alırıq, çünki onlar undefined ola bilər
        // və bu da xətalara səbəb olur.
        // if (this.sort) {
        //   this.sub$.sink = this.sort.sortChange.subscribe(
        //     () => (this.paginator.pageIndex = 0)
        //   );
        // }

        // if (this.sort && this.paginator) {
        //   this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
        //     .pipe(
        //       tap(() => {
        //         this.documentResource.skip =
        //           this.paginator.pageIndex * this.paginator.pageSize;
        //         this.documentResource.pageSize = this.paginator.pageSize;
        //         this.documentResource.orderBy =
        //           this.sort.active + ' ' + this.sort.direction;
        //         this.dataSource.loadDocuments(this.documentResource);
        //         this.selection.clear();
        //       })
        //     )
        //     .subscribe();
        // }

        // ElementRef-lərə müraciətləri də yoxlayırıq.
        // Əgər həmin HTML elementləri yoxdursa, `nativeElement` undefined olacaq.
        if (this.input && this.input.nativeElement) {
          this.sub$.sink = fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
              debounceTime(1000),
              distinctUntilChanged(),
              tap(() => {
                // this.paginator.pageIndex = 0; // Paginator yoxdursa, xəta verə bilər
                this.documentResource.skip = 0;
                this.documentResource.name = this.input.nativeElement.value;
                this.dataSource.loadDocuments(this.documentResource);
                this.selection.clear();
              })
            )
            .subscribe();
        }

        if (this.farmerid && this.farmerid.nativeElement) {
          this.sub$.sink = fromEvent(this.farmerid.nativeElement, 'keyup')
            .pipe(
              debounceTime(1000),
              distinctUntilChanged(),
              tap(() => {
                // this.paginator.pageIndex = 0; // Paginator yoxdursa, xəta verə bilər
                this.documentResource.skip = 0;
                this.documentResource.farmerid = this.farmerid.nativeElement.value;
                this.dataSource.loadDocuments(this.documentResource);
                this.selection.clear();
              })
            )
            .subscribe();
        }

        if (this.metatag && this.metatag.nativeElement) {
          this.sub$.sink = fromEvent(this.metatag.nativeElement, 'keyup')
            .pipe(
              debounceTime(1000),
              distinctUntilChanged(),
              tap(() => {
                // this.paginator.pageIndex = 0; // Paginator yoxdursa, xəta verə bilər
                this.documentResource.skip = 0;
                this.documentResource.metaTags = this.metatag.nativeElement.value;
                this.dataSource.loadDocuments(this.documentResource);
              })
            )
            .subscribe();
        }
        
        // createdDate.valueChanges hissəsini saxlayırıq, çünki bu, FormControl-dan gəlir
        this.sub$.sink = this.createdDate.valueChanges
          .pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            tap((value: any) => {
              // this.paginator.pageIndex = 0; // Paginator yoxdursa, xəta verə bilər
              this.documentResource.skip = 0;
              if (value) {
                this.documentResource.createDate = new Date(value).toISOString();
              } else {
                this.documentResource.createDate = null;
              }
              this.documentResource.skip = 0;
              this.dataSource.loadDocuments(this.documentResource);
            })
          )
          .subscribe();
      }

      isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }

      masterToggle() {
        this.isAllSelected()
          ? this.selection.clear()
          : this.dataSource.data.forEach((row) => this.selection.select(row));
      }

      onCategoryChange(filtervalue: any) {
        if (filtervalue.value) {
          this.documentResource.categoryId = filtervalue.value;
        } else {
          this.documentResource.categoryId = '';
        }
        this.documentResource.skip = 0;
        this.dataSource.loadDocuments(this.documentResource);
      }

      getCategories(): void {
        this.categoryService.getAllCategoriesForDropDown().subscribe((c) => {
          this.categories = c;
          this.setDeafLevel();
        });
      }

      setDeafLevel(parent?: Category, parentId?: string) {
        const children = this.categories.filter((c) => c.parentId == parentId);
        if (children.length > 0) {
          children.map((c, index) => {
            c.deafLevel = parent ? parent.deafLevel + 1 : 0;
            c.index =
              (parent ? parent.index : 0) + index * Math.pow(0.1, c.deafLevel);
            this.allCategories.push(c);
            this.setDeafLevel(c, c.id);
          });
        }
        return parent;
      }

      getResourceParameter() {
        this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
          (c: ResponseHeader) => {
            if (c) {
              this.documentResource.pageSize = c.pageSize;
              this.documentResource.skip = c.skip;
              this.documentResource.totalCount = c.totalCount;
            }
          }
        );
      }

      getDocuments(): void {
        console.log('DocumentLibraryListComponent: getDocuments metodu bypass edildi.');
        this.isLoadingResults = false;
      }

      getExpiryDate(
        maxRolePermissionEndDate: Date,
        maxUserPermissionEndDate: Date
      ) {
        if (maxRolePermissionEndDate && maxUserPermissionEndDate) {
          return maxRolePermissionEndDate > maxUserPermissionEndDate
            ? maxRolePermissionEndDate
            : maxUserPermissionEndDate;
        } else if (maxRolePermissionEndDate) {
          return maxRolePermissionEndDate;
        } else if (maxUserPermissionEndDate) {
          return maxUserPermissionEndDate;
        } else {
          return null;
        }
      }

      addReminder(documentInfo: DocumentInfo) {
        console.log('DocumentLibraryListComponent: addReminder metodu bypass edildi.');
      }

      onReminderList() {
        console.log('DocumentLibraryListComponent: onReminderList metodu bypass edildi.');
      }

      onAddDocument() {
        console.log('DocumentLibraryListComponent: onAddDocument metodu bypass edildi.');
      }

      onDocumentView(document: DocumentInfo) {
        console.log('DocumentLibraryListComponent: onDocumentView metodu bypass edildi.');
      }

      addDocumentTrail(id: string, operation: string) {
        console.log('DocumentLibraryListComponent: addDocumentTrail metodu bypass edildi.');
      }

      private downloadFile(data: HttpResponse<Blob>, documentInfo: DocumentInfo) {
        console.log('DocumentLibraryListComponent: downloadFile metodu bypass edildi.');
      }

      addComment(document: Document) {
        console.log('DocumentLibraryListComponent: addComment metodu bypass edildi.');
      }

      editDocument(documentInfo: DocumentInfo) {
        console.log('DocumentLibraryListComponent: editDocument metodu bypass edildi.');
      }

      onVersionHistoryClick(document: DocumentInfo): void {
        console.log('DocumentLibraryListComponent: onVersionHistoryClick metodu bypass edildi.');
      }

      manageDocumentPermission(documentInfo: DocumentInfo) {
        console.log('DocumentLibraryListComponent: manageDocumentPermission metodu bypass edildi.');
      }

      uploadNewVersion(document: Document) {
        console.log('DocumentLibraryListComponent: uploadNewVersion metodu bypass edildi.');
      }

      sendEmail(documentInfo: DocumentInfo) {
        console.log('DocumentLibraryListComponent: sendEmail metodu bypass edildi.');
      }

      deleteDocument(document: DocumentInfo) {
        console.log('DocumentLibraryListComponent: deleteDocument metodu bypass edildi.');
      }
    }
    