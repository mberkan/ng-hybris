import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {routes} from './app.routing';
import {
  API_BASE_URL,
  AUTHORIZATION_SERVER_CLIENT_ID,
  AUTHORIZATION_SERVER_CLIENT_SECRET,
  AUTHORIZATION_SERVER_URL
} from './app.tokens';
import {SHARED_SERVICES} from './shared/services';
import {HomeComponent} from './home/home.component';
import {CategoryListComponent} from "./category-list/category-list.component";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required for ng2-tag-input
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    RouterModule.forRoot(routes,
      { enableTracing: true} ),
    FlexLayoutModule
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: AUTHORIZATION_SERVER_URL, useValue: environment.authorizationServerUrl },
    { provide: AUTHORIZATION_SERVER_CLIENT_ID, useValue: environment.authorizationServerClientId },
    { provide: AUTHORIZATION_SERVER_CLIENT_SECRET, useValue: environment.authorizationServerClientSecret }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
