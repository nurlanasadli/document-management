import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// import { DocumentListComponent } from '../document-list/document-list.component';
// import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HomeComponent } from './document-home.component'; 

@NgModule({
  declarations: [
    HomeComponent,
    // DocumentListComponent,
    // DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  exports: [HomeComponent],
  providers: [],
})
export class HomeModule { }