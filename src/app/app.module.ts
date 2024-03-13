import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CertStorageComponent } from './cert-storage/cert-storage.component';

@NgModule({
  declarations: [
    AppComponent,
    CertStorageComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
