import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {routes} from './app.routing';
import {API_BASE_URL} from './app.tokens';
import {SHARED_SERVICES} from './shared/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,
      { enableTracing: true} )
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
