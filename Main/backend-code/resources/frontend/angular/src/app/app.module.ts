    import { NgModule } from '@angular/core';
    import { CoreModule } from './core/core.module';
    import { SharedModule } from './shared/shared.module';
    import { BrowserModule } from '@angular/platform-browser';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { HeaderComponent } from './layout/header/header.component';
    import { SidebarComponent } from './layout/sidebar/sidebar.component';
    import { LayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
    import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
    // TranslateHttpLoader artıq istifadə olunmadığı üçün silə bilərik
    // import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    import {
      HttpClientModule,
      HttpClient, // HttpClient hələ də digər modullar üçün lazım ola bilər
    } from '@angular/common/http';
    import { NgScrollbarModule } from 'ngx-scrollbar';
    import { HttpInterceptorModule } from '@core/interceptor/http-interceptor.module';
    import { PendingInterceptorModule } from '@shared/loading-indicator/pending-interceptor.module';
    import { WINDOW_PROVIDERS } from '@core/services/window.service';
    import { ToastrModule } from 'ngx-toastr';
    import { AppStoreModule } from './store/app-store.module';
    import { LoadingIndicatorModule } from '@shared/loading-indicator/loading-indicator.module';
    import { APP_BASE_HREF } from '@angular/common';
    import { environment } from '@environments/environment';

    import { of } from 'rxjs'; // `of` operatörü NoopTranslateLoader üçün lazımdır

    // Backend olmadan tərcümə fayllarını yükləmək üçün mock loader
    export class NoopTranslateLoader implements TranslateLoader {
      getTranslation(lang: string): any {
        return of({}); // Boş bir Observable qaytarır
      }
    }

    // Orijinal `createTranslateLoader` funksiyası artıq istifadə olunmadığı üçün şərhə alındı.
    // export function createTranslateLoader(http: HttpClient) {
    //   return new TranslateHttpLoader(http, `${environment.apiUrl}api/i18n/`);
    // }

    @NgModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        LayoutComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgScrollbarModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: NoopTranslateLoader, // Mock loader istifadə olunur
            // deps: [HttpClient], // HttpClient artıq lazım deyil
          },
        }),
        CoreModule,
        LoadingIndicatorModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientModule, // İki dəfə olması problem deyil, amma təmizləmək olar
        HttpInterceptorModule,
        AppStoreModule,
        PendingInterceptorModule
      ],
      providers: [
        WINDOW_PROVIDERS,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      bootstrap: [AppComponent],
    })
    export class AppModule { }
    